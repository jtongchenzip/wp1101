from fastapi import APIRouter, responses

router = APIRouter(tags=['Public'])


@router.get("/", status_code=200, response_class=responses.HTMLResponse)
async def default_page():
    return "<a href=\"/docs\">/docs</a>"
