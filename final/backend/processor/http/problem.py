from dataclasses import dataclass
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Depends, responses, UploadFile, File
from uuid import uuid4

import exceptions as exc
from middleware.envelope import enveloped
from middleware.headers import get_auth_token
from middleware.context import request
from base.enums import RoleType
from base import do
import persistence.database as db
from persistence.s3 import s3_handler
from processor.http.util import timezone_validate

router = APIRouter(
    tags=['Problem'],
    default_response_class=responses.JSONResponse,
    dependencies=[Depends(get_auth_token)]
)


@dataclass
class ReadProblemOutput:
    id: int
    title: str
    description: Optional[str]
    start_time: datetime
    end_time: datetime


@router.get('/problem/{problem_id}')
@enveloped
async def read_problem(problem_id: int) -> ReadProblemOutput:
    problem = await db.problem.read(problem_id=problem_id)
    is_publicized = request.account.role is RoleType.TA or request.time > datetime.now()
    return ReadProblemOutput(id=problem.id,
                             title=problem.title,
                             description=problem.description if is_publicized else None,
                             start_time=problem.start_time,
                             end_time=problem.end_time)


@dataclass
class AddProblemOutput:
    id: int


@router.post('/problem/{problem_id}')
@enveloped
async def add_problem(title: str, start_time: datetime, end_time: datetime,
                      description: Optional[str] = None, problem_file: UploadFile = File(...)) -> AddProblemOutput:
    if request.account.role is not RoleType.TA:
        raise exc.NoPermission

    s3_file_uuid = uuid4()
    await s3_handler.upload(problem_file.file, s3_file_uuid)
    await db.s3_file.add(s3_file=do.S3File(key=str(s3_file_uuid),
                                           bucket='temp',
                                           uuid=s3_file_uuid))  # FIXME: bucket name

    problem_id = await db.problem.add(title=title, start_time=start_time, end_time=end_time,
                                      description=description, filename=problem_file.filename,
                                      testcase_file_uuid=s3_file_uuid)

    return AddProblemOutput(id=problem_id)


@router.delete('/problem/{problem_id}')
@enveloped
async def delete_problem(problem_id: int) -> None:
    if request.account.role is not RoleType.TA:
        raise exc.NoPermission

    return await db.problem.delete(problem_id=problem_id)


@router.patch('/problem/{problem_id}')
@enveloped
async def edit_problem(problem_id: int, title: str = None, start_time: datetime = None,
                       end_time: datetime = None, description: Optional[str] = None,
                       problem_file: UploadFile = File(None)) -> None:

    if request.account.role != RoleType.TA:
        raise exc.NoPermission

    s3_file_uuid = uuid4() if problem_file else None
    filename = problem_file.filename if problem_file else None

    await db.problem.edit(problem_id=problem_id, title=title, start_time=start_time, end_time=end_time,
                          description=description, filename=filename, testcase_file_uuid=s3_file_uuid)
