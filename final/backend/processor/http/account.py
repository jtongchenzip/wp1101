from dataclasses import dataclass

from fastapi import APIRouter, responses, Depends, Request
from pydantic import BaseModel

from security import encode_jwt, verify_password, hash_password
from middleware.envelope import enveloped
from middleware.headers import get_auth_token
import persistence.database as db
import exceptions as exc
from base import do
from base.enums import RoleType

router = APIRouter(
    tags=['Account'],
    default_response_class=responses.JSONResponse,
    dependencies=[Depends(get_auth_token)]
)


class AddAccountInput(BaseModel):
    username: str
    password: str
    real_name: str
    student_id: str


@dataclass
class AddAccountOutput:
    id: int


@router.post('/account')
@enveloped
async def add_account(data: AddAccountInput) -> AddAccountOutput:
    if await db.account.is_duplicate_student_id(student_id=data.student_id):
        raise exc.DuplicateStudentId
    try:
        account_id = await db.account.add(username=data.username,
                                          pass_hash=hash_password(data.password),
                                          role=RoleType.student,
                                          real_name=data.real_name,
                                          student_id=data.student_id)
    except exc.UniqueViolationError:
        raise exc.UsernameExists

    return AddAccountOutput(id=account_id)


@router.get('/account/{account_id}')
# @enveloped
async def read_account(account_id: int, request: Request) -> do.Account:
    if not (request.state.account.id is account_id or request.state.account.role is RoleType.TA):
        raise exc.NoPermission

    account = await db.account.read(account_id)
    return account


class LoginInput(BaseModel):
    username: str
    password: str


@dataclass
class LoginOutput:
    account_id: int
    token: str


@router.post('/login')
@enveloped
async def login(data: LoginInput) -> LoginOutput:
    try:
        account_id, pass_hash, role = await db.account.read_by_username(data.username)
    except exc.NotFound:
        raise exc.LoginFailed

    if not verify_password(data.password, pass_hash):
        raise exc.LoginFailed

    token = encode_jwt(account_id=account_id, role=role)
    return LoginOutput(account_id=account_id, token=token)
