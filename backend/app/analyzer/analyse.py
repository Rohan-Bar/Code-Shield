from fastapi import APIRouter

from app.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    ComplexityResponse,
    DiffResponse,
)
from app.analyzer.security_analyzer import analyze_security


router = APIRouter(
    prefix="/api",
    tags=["Analysis"],
)


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_code(request: AnalyzeRequest):

    # Run static security analysis
    issues = analyze_security(request.code)

    return AnalyzeResponse(
        analysis_id="test-001",
        issues=issues,
        complexity=ComplexityResponse(
            time="O(1)",
            space="O(1)",
            bottleneck_lines="",
        ),
        diff=DiffResponse(
            vulnerable=request.code.splitlines(),
            secure=request.code.splitlines(),
        ),
    )