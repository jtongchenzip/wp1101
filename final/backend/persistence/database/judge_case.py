from base import enums

from .base import SafeExecutor


async def add(submission_id: int, title: str, description: str,
              state: enums.JudgeCaseState, error_message: str = None) -> int:
    async with SafeExecutor(
            sql=fr"INSERT INTO judge_case"
                fr"            (submission_id, title, description, state, error_message)"
                fr"     VALUES (%(submission_id)s, %(title)s, %(description)s, %(state)s, %(error_message)s)"
                fr"  RETURNING id",
            submission_id=submission_id, title=title, description=description, state=state, error_message=error_message,
            fetch=1,
    ) as (id_,):
        return id_
