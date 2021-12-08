from fastapi import APIRouter, Depends

from middleware.headers import get_auth_token

router = APIRouter(tags=['S3 File'], dependencies=[Depends(get_auth_token)])
