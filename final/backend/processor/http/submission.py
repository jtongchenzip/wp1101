from fastapi import APIRouter, Depends, responses

from middleware.headers import get_auth_token

router = APIRouter(
    tags=['Submission'],
    default_response_class=responses.JSONResponse,
    dependencies=[Depends(get_auth_token)])
