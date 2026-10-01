from groq import Groq

from .parser import parse_llm_response
from .prompts import SECURITY_ANALYSIS_PROMPT
from .schemas import LLMAnalysisResult


class GroqProvider:

    def __init__(
        self,
        api_key: str,
        model: str,
    ):

        self.client = Groq(
            api_key=api_key
        )

        self.model = model

    def analyze_code(
        self,
        code: str,
        language: str,
    ) -> LLMAnalysisResult:

        response = self.client.chat.completions.create(

            model=self.model,

            messages=[
                {
                    "role": "system",
                    "content": SECURITY_ANALYSIS_PROMPT,
                },
                {
                    "role": "user",
                    "content": (
                        f"Analyze the following "
                        f"{language} source code.\n\n"
                        f"CODE:\n\n"
                        f"{code}"
                    ),
                },
            ],

            temperature=0,
        )

        raw_response = (
            response
            .choices[0]
            .message
            .content
        )

        return parse_llm_response(
            raw_response
        )