from base import do

from .util import pyformat2psql, param_maker
from . import pool_handler


async def add(s3_file: do.S3File) -> None:
    sql = (
        fr"INSERT INTO s3_file"
        fr"            (uuid, key, bucket)"
        fr"VALUES (%(uuid)s, %(key)s, %(bucket)s)"
    )

    params = param_maker(uuid=s3_file.uuid, key=s3_file.key, bucket=s3_file.bucket)
    sql, params = pyformat2psql(sql, params)
    await pool_handler.pool.execute(sql, *params)
