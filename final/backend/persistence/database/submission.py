from datetime import datetime
from uuid import UUID

from .util import pyformat2psql, param_maker
from . import pool_handler


async def edit(submission_id: int, total_pass: int, total_fail: int) -> None:
    sql = (
        fr"UPDATE submission"
        fr"   SET total_pass = %(total_pass)s, total_fail = %(total_fail)s"
        fr" WHERE id = %(submission_id)s"
    )
    params = param_maker(total_pass=total_pass, total_fail=total_fail, submission_id=submission_id)
    sql, params = pyformat2psql(sql, params)
    await pool_handler.pool.execute(sql, *params)


async def add(account_id: int, problem_id: int, submit_time: datetime, filename: str, content_file_uuid: UUID) -> int:
    sql = (
        fr"INSERT INTO submission"
        fr"            (account_id, problem_id, submit_time, filename, content_file_uuid)"
        fr"     VALUES (%(account_id)s, %(problem_id)s, %(submit_time)s, %(filename)s, %(content_file_uuid)s)"
        fr"  RETURNING id"
    )
    params = param_maker(account_id=account_id, problem_id=problem_id, submit_time=submit_time,
                         filename=filename, content_file_uuid=content_file_uuid)
    sql, params = pyformat2psql(sql, params)
    id_, = await pool_handler.pool.fetchrow(sql, *params)
    return id_
