from datetime import datetime
from typing import Optional
from uuid import UUID

import asyncpg

from base import do
import exceptions as exc

from .util import pyformat2psql, param_maker
from . import pool_handler


async def read(problem_id: int) -> do.Problem:
    sql = (
        fr"SELECT id, title, testcase_file_uuid, description, start_time, end_time"
        fr"  FROM problem"
        fr" WHERE id = %(problem_id)s"
    )
    params = param_maker(problem_id=problem_id)
    sql, params = pyformat2psql(sql, params)
    try:
        id_, title, testcase_file_uuid, description, start_time, end_time = await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return do.Problem(id=id_, title=title, testcase_file_uuid=testcase_file_uuid,
                      description=description, start_time=start_time, end_time=end_time)


"""
fetchrow: 抓一筆 (read)
fetch: 抓很多筆 (browse)
execute: 不用抓資料 (edit, delete)
"""


async def add(title: str, start_time: datetime, end_time: datetime,
              description: Optional[str], filename: str, testcase_file_uuid: UUID) -> int:
    sql = (
        fr"INSERT INTO problem"
        fr"            (title, start_time, end_time, testcase_file_uuid, filename, description)"
        fr"       VALUES (%(title)s, %(start_time)s, %(end_time)s, %(description)s, %(filename)s, %(s3_file_uuid)s)"
    )

    params = param_maker(title=title, start_time=start_time, end_time=end_time, description=description,
                         filename=filename, testcase_file_uuid=testcase_file_uuid)
    sql, params = pyformat2psql(sql, params)
    try:
        id_, = await pool_handler.pool.fetchrow(sql, *params)
    except asyncpg.exceptions.UniqueViolationError:
        raise exc.ProblemTitleExist
    return id_
