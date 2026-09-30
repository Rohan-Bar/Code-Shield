from pydantic import BaseModel, Field
from typing import List


class LLMIssue(BaseModel):
    owasp_category: str
    type: str
    severity: str
    line: int
    description: str
    evidence: str
    secure_fix: str


class LLMAnalysisResult(BaseModel):
    issues: List[LLMIssue] = Field(default_factory=list)