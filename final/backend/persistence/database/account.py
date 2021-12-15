from base import do
from base.enums import RoleType
import exceptions as exc

from .util import pyformat2psql, param_maker
from . import pool_handler


async def add(username: str, pass_hash: str, role: RoleType, real_name: str, student_id: str) -> int:
    sql = (
        fr"INSERT INTO account" 
        fr"            (username, pass_hash, role, real_name, student_id)"
        fr"     VALUES (%(username)s, %(pass_hash)s, %(role)s, %(real_name)s, LOWER(%(student_id)s))"
        fr"  RETURNING id"
    )
    params = param_maker(username=username, pass_hash=pass_hash, role=role.value,
                         real_name=real_name, student_id=student_id)
    sql, params = pyformat2psql(sql, params)
    id_, = await pool_handler.pool.fetchrow(sql, *params)
    return id_


async def read(account_id: int) -> do.Account:
    sql = (
        fr"SELECT id, username, role, student_id, real_name"
        fr"  FROM account"
        fr" WHERE id = %(account_id)s"
    )
    params = param_maker(account_id=account_id)
    sql, params = pyformat2psql(sql, params)
    try:
        id_, username, role, student_id, real_name = await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return do.Account(id=id_, username=username, role=RoleType(role),
                      student_id=student_id, real_name=real_name)


async def read_by_username(username: str) -> tuple[int, str, RoleType]:
    sql = (
        fr"SELECT id, pass_hash, role"
        fr"  FROM account"
        fr" WHERE username = %(username)s"
    )
    params = param_maker(username=username)
    sql, params = pyformat2psql(sql, params)
    id_, pass_hash, role = await pool_handler.pool.fetchrow(sql, *params)
    return id_, pass_hash, RoleType(role)


async def is_duplicate_student_id(student_id: str) -> bool:
    sql = (
        fr"SELECT COUNT(*) FROM account"
        fr" WHERE student_id = LOWER(%(student_id)s)"
    )
    params = param_maker(student_id=student_id)
    sql, params = pyformat2psql(sql, params)
    count, = await pool_handler.pool.fetchrow(sql, *params)
    return count > 0