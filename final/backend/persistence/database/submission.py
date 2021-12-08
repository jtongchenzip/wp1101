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
