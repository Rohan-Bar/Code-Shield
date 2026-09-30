import json

from .schemas import LLMAnalysisResult


def parse_llm_response(raw_response: str) -> LLMAnalysisResult:
    """
    Convert the raw LLM response into validated CodeShield data.
    """

    raw_response = raw_response.strip()

    # Remove markdown code fences if the model accidentally adds them.
    if raw_response.startswith("```"):
        lines = raw_response.splitlines()

        if lines[0].startswith("```"):
            lines = lines[1:]

        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]

        raw_response = "\n".join(lines).strip()

    try:
        data = json.loads(raw_response)

    except json.JSONDecodeError as exc:
        raise ValueError(
            "LLM returned invalid JSON."
        ) from exc

    try:
        return LLMAnalysisResult.model_validate(data)

    except Exception as exc:
        raise ValueError(
            "LLM response does not match the expected CodeShield format."
        ) from exc