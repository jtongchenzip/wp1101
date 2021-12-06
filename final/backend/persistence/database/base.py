import collections
import itertools
from typing import Any, Dict, Tuple, List, Optional, Union


# https://github.com/MagicStack/asyncpg/issues/9#issuecomment-600659015
def pyformat2psql(query: str, named_args: Dict[str, Any]) -> Tuple[str, List[Any]]:
    positional_generator = itertools.count(1)
    positional_map = collections.defaultdict(lambda: '${}'.format(next(positional_generator)))
    formatted_query = query % positional_map
    positional_items = sorted(
        positional_map.items(),
        key=lambda item: int(item[1].replace('$', '')),
    )
    positional_args = [named_args[named_arg] for named_arg, _ in positional_items]
    return formatted_query, positional_args


from typing import Dict

import asyncpg
import asyncpg.exceptions

import exceptions as exc

from . import pool_handler


# Context managers for safe execution

class SafeExecutor:
    def __init__(self, sql: str, parameters: Dict = None, fetch: Union[int, str] = None, **kwparams):
        self.fetch = fetch
        if parameters is None:
            parameters = {}
        parameters.update(**kwparams)
        self._sql, self._parameters = pyformat2psql(query=sql, named_args=parameters)

    async def __aenter__(self) -> Optional[Union[asyncpg.Record, List[asyncpg.Record]]]:
        async with pool_handler.pool.acquire() as conn:
            try:
                if isinstance(self.fetch, int):
                    return await conn.fetchrow(self._sql, *self._parameters)
                elif isinstance(self.fetch, str):
                    if self.fetch == 'all':
                        return await conn.fetch(self._sql, *self._parameters)
                elif not self.fetch:
                    return await conn.execute(self._sql, *self._parameters)
            except asyncpg.exceptions.UniqueViolationError:
                raise exc.UniqueViolationError
            raise ValueError

    async def __aexit__(self, exc_type, exc_value, traceback):
        if exc_type is TypeError:
            raise exc.NotFound
