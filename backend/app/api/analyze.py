from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    ComplexityResponse,
    DiffResponse,
)
from app.analyzer.security_analyzer import analyze_security
from app.analyzer.complexity_analyzer import analyze_complexity
from app.analyzer.code_parser import create_basic_diff
from app.database import get_db
from app.models import Analysis


router = APIRouter(
    prefix="/api",
    tags=["Analysis"],
)


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_code(
    request: AnalyzeRequest,
    db: Session = Depends(get_db),
):

    # 1. Security analysis
    issues = analyze_security(request.code)

    # 2. Complexity analysis
    complexity = analyze_complexity(request.code)

    # 3. Diff preparation
    diff_data = create_basic_diff(request.code, issues)

    # 4. Save analysis to PostgreSQL
    analysis = Analysis(
        code=request.code,
        language=request.language,
        issues=issues,
        complexity=complexity,
        secure_code="\n".join(diff_data["secure"]),
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    # 5. Return database-generated analysis ID
    return AnalyzeResponse(
        analysis_id=str(analysis.id),
        issues=issues,
        complexity=ComplexityResponse(
            time=complexity["time"],
            space=complexity["space"],
            bottleneck_lines=complexity["bottleneck_lines"],
        ),
        diff=DiffResponse(
            vulnerable=diff_data["vulnerable"],
            secure=diff_data["secure"],
        ),
    )