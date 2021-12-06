from .base import SafeExecutor


async def edit(submission_id: int, total_pass: int, total_fail: int) -> None:
    print('here')
    async with SafeExecutor(
            sql=fr"UPDATE submission"
                fr"   SET total_pass = %(total_pass)s, total_fail = %(total_fail)s"
                fr" WHERE id = %(submission_id)s",
            total_pass=total_pass, total_fail=total_fail, submission_id=submission_id,
            fetch=None,
    ):
        print('hello')
        return
