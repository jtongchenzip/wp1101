from dataclasses import dataclass
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Request, Depends

from middleware.envelope import enveloped
from middleware.headers import get_auth_token
from base.enums import RoleType
import persistence.database as db


router = APIRouter(tags=['Problem'], dependencies=[Depends(get_auth_token)])


@dataclass
class ReadProblemOutput:
    id: int
    title: str
    description: Optional[str]
    start_time: datetime
    end_time: datetime


@router.get('/problem/{problem_id}')
@enveloped
async def read_problem(problem_id: int, request: Request) -> ReadProblemOutput:
    problem = await db.problem.read(problem_id=problem_id)
    is_publicized = request.state.account.role is RoleType.TA or datetime.now() > problem.start_time
    return ReadProblemOutput(id=problem.id,
                             title=problem.title,
                             description=problem.description if is_publicized else None,
                             start_time=problem.start_time,
                             end_time=problem.end_time)
