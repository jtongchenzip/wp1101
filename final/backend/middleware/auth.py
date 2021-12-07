from datetime import datetime

from fastapi import Request

import security
from security import AuthedAccount


async def middleware(request: Request, call_next):
    account = AuthedAccount
    if auth_token := request.headers.get('auth-token', None):
        account = security.decode_jwt(auth_token, time=datetime.now())

    request.state.account = account
    return await call_next(request)
