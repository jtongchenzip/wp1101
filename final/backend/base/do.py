from dataclasses import dataclass
from typing import Optional, Sequence

from base import enums


@dataclass
class Account:
    id: int
    username: str
    role: enums.RoleType
    real_name: str
    student_id: str


@dataclass
class JudgeCase:
    id: int
    submission_id: int
    title: str
    description: str
    state: enums.JudgeCaseState
    error_message: Optional[str]


@dataclass
class JudgeCaseReport:
    title: str
    description: str
    state: enums.JudgeCaseState
    error_message: Optional[str]


@dataclass
class JudgeReport:
    submission_id: int
    total_passes: int
    total_failures: int
    judge_cases: Sequence[JudgeCaseReport]


@dataclass
class JudgeTask:
    problem_url: str
    submission_id: int
    submission_url: str


