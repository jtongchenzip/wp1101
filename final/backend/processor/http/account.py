from dataclasses import dataclass

from fastapi import APIRouter, responses, Depends
from pydantic import BaseModel

from security import encode_jwt, verify_password, hash_password
from middleware.envelope import enveloped
from middleware.headers import get_auth_token
from middleware.context import request
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
@enveloped
async def read_account(account_id: int) -> do.Account:
    if not (request.account.role is RoleType.TA or request.account.id is account_id):
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
    except TypeError:
        raise exc.LoginFailed

    if not verify_password(data.password, pass_hash):
        raise exc.LoginFailed

    token = encode_jwt(account_id=account_id, role=role)
    return LoginOutput(account_id=account_id, token=token)


@router.delete('/account/{account_id}')
@enveloped
async def delete_account(account_id: int) -> None:
    if not (request.account.role is RoleType.TA):
        raise exc.NoPermission

    return await db.account.delete(account_id=account_id)


from persistence.amqp_publisher import send_judge
@router.post('/test')
@enveloped
async def test() -> None:
    cypress_uuid = 'bd5ee264-e499-4a1c-9073-7bd0ecc39e30'
    src_uuid = '6c4dd50a-e186-4109-9fcb-c850e0b61e47'
    cypress_url = await s3_handler.sign_url('temp', cypress_uuid, 'cypress.zip')
    src_url = await s3_handler.sign_url('temp', src_uuid, 'src.zip')
    await send_judge(do.JudgeTask(submission_id=1, submission_url=src_url, problem_url=cypress_url))


from persistence.s3 import s3_handler
from fastapi import UploadFile, File
from uuid import uuid4
@router.post('/test-upload')
@enveloped
async def test_upload(file: UploadFile = File(...)) -> str:
    id_ = uuid4()
    await s3_handler.upload(file, key=id_)
    return await s3_handler.sign_url('temp', key=str(id_), filename=file.filename)

"""
from persistence.amqp_publisher import send_judge

@router.post('/test')
@enveloped
async def test_jc() -> None:
    cypress_url = 'https://s3.dev.pdogs.ntu.im:9443/temp/7cbfc374-e0f8-42c4-b832-b0e75940f872?response-content' \
                  '-disposition=attachment%3Bfilename%3D%22cypress.zip%22%3B&AWSAccessKeyId=pdogs-dev&Signature' \
                  '=vJlTqlAHcqGoWRQpG%2B%2BaPUh1HFo%3D&Expires=1639667706 '
    src_url = 'https://s3.dev.pdogs.ntu.im:9443/temp/f2dedcd2-7295-418e-8e7c-d4a3131d0a7a?response-content' \
              '-disposition=attachment%3Bfilename%3D%22src.zip%22%3B&AWSAccessKeyId=pdogs-dev&Signature' \
              '=JBP0xNA7Qtqpra76IEquOoEAyZ0%3D&Expires=1639667780 '
    await send_judge(do.JudgeTask(submission_id=1, submission_url=src_url, problem_url=cypress_url))
    return
"""
