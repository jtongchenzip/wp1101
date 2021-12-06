from base import do, enums

from .base import SafeExecutor


async def add(username: str, pass_hash: str, role: enums.RoleType, real_name: str, student_id: str) -> int:
    async with SafeExecutor(
            sql=fr"INSERT INTO account "
                fr"            (username, pass_hash, role, real_name, student_id)"
                fr"     VALUES (%(username)s, %(pass_hash)s, %(role)s, %(real_name)s, LOWER(%(student_id)s))"
                fr"  RETURNING id",
            username=username, pass_hash=pass_hash, role=role.value, real_name=real_name, student_id=student_id,
            fetch=1,
    ) as (id_,):
        return id_


async def read(account_id: int) -> do.Account:
    async with SafeExecutor(
            sql=fr"SELECT id, username, role, student_id, real_name"
                fr"  FROM account"
                fr" WHERE id = %(account_id)s",
            account_id=account_id,
            fetch=1,
    ) as (id_, username, role, student_id, real_name):
        return do.Account(id=id_, username=username, role=enums.RoleType(role),
                          student_id=student_id, real_name=real_name)


async def read_by_username(username: str) -> tuple[int, str, enums.RoleType]:
    async with SafeExecutor(
            sql=fr"SELECT id, pass_hash, role"
                fr"  FROM account"
                fr" WHERE username = %(username)s",
            username=username,
            fetch=1,
    ) as (id_, pass_hash, role):
        return id_, pass_hash, enums.RoleType(role)


async def is_duplicate_student_id(student_id: str) -> bool:
    async with SafeExecutor(
            sql=fr"SELECT COUNT(*) FROM account"
                fr" WHERE student_id = LOWER(%(student_id)s)",
            student_id=student_id,
            fetch=1,
    ) as (count, ):
        return count > 0
