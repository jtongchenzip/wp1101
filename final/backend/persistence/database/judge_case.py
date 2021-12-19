from base import do, enums
from typing import Sequence

from .util import pyformat2psql, param_maker
from . import pool_handler


async def add(submission_id: int, title: str, description: str,
              state: enums.JudgeCaseState, error_message: str = None) -> int:
    sql = (
        fr"INSERT INTO judge_case"
        fr"            (submission_id, title, description, state, error_message)"
        fr"     VALUES (%(submission_id)s, %(title)s, %(description)s, %(state)s, %(error_message)s)"
        fr"  RETURNING id"
    )
    params = param_maker(submission_id=submission_id, title=title, description=description,
                         state=state.value, error_message=error_message)
    sql, params = pyformat2psql(sql, params)
    id_, = await pool_handler.pool.fetchrow(sql, *params)
    return id_


async def browse(submission_id: int) -> Sequence[do.JudgeCase]:
    sql = (
        fr"SELECT id, submission_id, title, description, state, error_message"
        fr"  FROM judge_case"
        fr" WHERE submission_id= %(submission_id)s"
        fr" ORDER BY id ASC"
    )
    params = param_maker(submission_id=submission_id)
    sql, params = pyformat2psql(sql, params)
    records = await pool_handler.pool.fetch(sql, *params)
    print(records)
    return [do.JudgeCase(id=id_, submission_id=submission_id, title=title, description=description,
                         state=state, error_message=error_message)
            for id_, submission_id, title, description, state, error_message in records]
