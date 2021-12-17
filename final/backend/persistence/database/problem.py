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


async def delete(problem_id: int) -> None:
    sql = (
        fr"DELETE FROM problem"
        fr" WHERE id = %(problem_id)s"
    )
    params = param_maker(problem_id=problem_id)
    sql, params = pyformat2psql(sql, params)
    await pool_handler.pool.execute(sql, *params)
