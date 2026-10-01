import re
import uuid

from fastapi import APIRouter

from app.config import settings
from app.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    ComplexityResponse,
    DiffResponse,
    LLMIssueResponse,
)
from app.analyzer.security_analyzer import analyze_security
from app.llm.service import LLMService


router = APIRouter(
    prefix="/api",
    tags=["Analysis"],
)


# ---------------------------------------------------------
# LLM SERVICE
# ---------------------------------------------------------

llm_service = LLMService(
    api_key=settings.GROQ_API_KEY,
    model=settings.GROQ_MODEL,
)


# ---------------------------------------------------------
# COMPLEXITY ANALYSIS
# ---------------------------------------------------------

def analyze_complexity(code: str) -> ComplexityResponse:

    lines = code.splitlines()

    loop_count = len(
        re.findall(r"\b(for|while)\b", code)
    )

    nested_loop = bool(
        re.search(
            r"(for|while)[\s\S]{0,500}(for|while)",
            code,
            re.IGNORECASE,
        )
    )

    if nested_loop:
        time_complexity = "O(n^2) estimated"
    elif loop_count:
        time_complexity = "O(n) estimated"
    else:
        time_complexity = "O(1) estimated"

    space_complexity = "O(1) estimated"

    bottleneck_lines = []

    for line_number, line in enumerate(lines, start=1):
        if re.search(
            r"\b(for|while)\b",
            line,
            re.IGNORECASE,
        ):
            bottleneck_lines.append(line_number)

    return ComplexityResponse(
        time=time_complexity,
        space=space_complexity,
        bottleneck_lines=", ".join(
            map(str, bottleneck_lines)
        ),
    )


# ---------------------------------------------------------
# ANALYZE ENDPOINT
# ---------------------------------------------------------

@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
)
def analyze_code(request: AnalyzeRequest):

    # -----------------------------------------------------
    # 1. STATIC SECURITY ANALYSIS
    # -----------------------------------------------------

    static_issues = analyze_security(
        request.code
    )

    # -----------------------------------------------------
    # 2. AI SECURITY ANALYSIS
    # -----------------------------------------------------

    llm_result = llm_service.analyze_code(
        code=request.code,
        language=request.language,
    )

    # -----------------------------------------------------
    # 3. CONVERT LLM RESULTS TO API RESPONSE
    # -----------------------------------------------------

    llm_issues = []

    for issue in llm_result.issues:

        severity = issue.severity.upper()

        if severity not in {
            "HIGH",
            "MEDIUM",
            "LOW",
        }:
            severity = "MEDIUM"

        llm_issues.append(
            LLMIssueResponse(
                owasp_category=issue.owasp_category,
                type=issue.type,
                severity=severity,
                line=issue.line,
                description=issue.description,
                evidence=issue.evidence,
                secure_fix=issue.secure_fix,
            )
        )

    # -----------------------------------------------------
    # 4. COMPLEXITY
    # -----------------------------------------------------

    complexity = analyze_complexity(
        request.code
    )

    # -----------------------------------------------------
    # 5. DIFF
    # -----------------------------------------------------

    vulnerable_lines = request.code.splitlines()

    secure_lines = request.code.splitlines()

    # -----------------------------------------------------
    # 6. FINAL RESPONSE
    # -----------------------------------------------------

    return AnalyzeResponse(
        analysis_id=str(uuid.uuid4()),
        issues=static_issues,
        llm_issues=llm_issues,
        complexity=complexity,
        diff=DiffResponse(
            vulnerable=vulnerable_lines,
            secure=secure_lines,
        ),
    )