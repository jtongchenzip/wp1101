import fastapi


def register_routers(app: fastapi.FastAPI):
    from . import (
        account,
        judge_case,
        problem,
        public,
        s3_file,
        submission,
    )

    app.include_router(public.router)
    app.include_router(account.router)
    app.include_router(s3_file.router)
    app.include_router(problem.router)
    app.include_router(submission.router)
    app.include_router(judge_case.router)
