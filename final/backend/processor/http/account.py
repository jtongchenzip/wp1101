from dataclasses import dataclass
from datetime import datetime

from fastapi import APIRouter, responses, Header
from pydantic import BaseModel

from security import decode_jwt, encode_jwt, verify_password, hash_password
from middleware.envelope import enveloped
import persistence.database as db
import exceptions as exc
from base import do
from base.enums import RoleType

router = APIRouter(
    tags=['Account'],
    default_response_class=responses.JSONResponse,
)


class AddAccountInput(BaseModel):
    username: str
    password: str


@dataclass
class AddAccountOutput:
    id: int


@router.post('/account')
@enveloped
async def add_account(data: AddAccountInput) -> AddAccountOutput:
    try:
        account_id = await db.account.add(username=data.username,
                                          pass_hash=hash_password(data.password),
                                          role=RoleType.student)
    except exc.UniqueViolationError:
        raise exc.UsernameExists

    return AddAccountOutput(id=account_id)


@router.get('/account/{account_id}')
@enveloped
async def read_account(account_id: int, token: str = Header(None)) -> do.Account:
    request = await decode_jwt(token, datetime.now())
    if request.id is not account_id:
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
        account_id, pass_hash = await db.account.read_by_username(data.username)
    except exc.NotFound:
        raise exc.LoginFailed

    if not verify_password(data.password, pass_hash):
        raise exc.LoginFailed
    token = await encode_jwt(account_id=account_id)
    return LoginOutput(account_id=account_id, token=token)
