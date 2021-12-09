from base import do

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
    id_, title, testcase_file_uuid, description, start_time, end_time = await pool_handler.pool.fetchrow(sql, *params)
    return do.Problem(id=id_, title=title, testcase_file_uuid=testcase_file_uuid,
                      description=description, start_time=start_time, end_time=end_time)