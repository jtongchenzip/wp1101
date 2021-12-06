from fastapi import APIRouter, responses

from config import app_config

router = APIRouter(tags=['Public'])


@router.get("/", status_code=200, response_class=responses.HTMLResponse)
async def default_page():

    return fr"""
<a href ='{app_config.docs_url}'>{app_config.docs_url}</a>
"""
