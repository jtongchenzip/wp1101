from dataclasses import dataclass
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Depends, responses

import exceptions as exc
from middleware.envelope import enveloped
from middleware.headers import get_auth_token
from middleware.context import request
from base.enums import RoleType
import persistence.database as db
from persistence.s3 import s3_handler

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


@router.delete('/problem/{problem_id}')
@enveloped
async def delete_problem(problem_id: int):
    if request.account.role is not RoleType.TA:
        raise exc.NoPermission

    return await db.problem.delete(problem_id=problem_id)

