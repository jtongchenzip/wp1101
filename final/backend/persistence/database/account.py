from base import do, enums

from .base import SafeExecutor


async def add(username: str, pass_hash: str, role: enums.RoleType) -> int:
    async with SafeExecutor(
            sql=fr"INSERT INTO account "
                fr"            (username, pass_hash, role)"
                fr"     VALUES (%(username)s, %(pass_hash)s, %(role)s)"
                fr"  RETURNING id",
            username=username, pass_hash=pass_hash, role=role.value,
            fetch=1,
    ) as (id_,):
        return id_


async def read(account_id: int) -> do.Account:
    async with SafeExecutor(
            sql=fr"SELECT id, username, role"
                fr"  FROM account"
                fr" WHERE id = %(account_id)s",
            account_id=account_id,
            fetch=1,
    ) as (id_, username, role):
        return do.Account(id=id_, username=username, role=enums.RoleType(role))


async def read_by_username(username: str) -> tuple[int, str]:
    async with SafeExecutor(
            sql=fr"SELECT id, pass_hash"
                fr"  FROM account"
                fr" WHERE username = %(username)s",
            username=username,
            fetch=1,
    ) as (id_, pass_hash):
        return id_, pass_hash
