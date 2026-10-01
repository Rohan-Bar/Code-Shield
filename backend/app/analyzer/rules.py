import re


def check_dangerous_functions(code: str):
    findings = []

    patterns = [
        (r"\beval\s*\(", "Code Injection", "HIGH"),
        (r"\bexec\s*\(", "Code Injection", "HIGH"),
        (r"\bos\.system\s*\(", "Command Injection", "HIGH"),
        (r"\bpickle\.loads\s*\(", "Insecure Deserialization", "HIGH"),
    ]

    for line_number, line in enumerate(code.splitlines(), start=1):
        for pattern, vulnerability_type, severity in patterns:
            if re.search(pattern, line):
                findings.append(
                    {
                        "id": f"rule-{line_number}-{vulnerability_type.lower().replace(' ', '-')}",
                        "type": vulnerability_type,
                        "severity": severity,
                        "line": line_number,
                        "description": (
                            f"Potential {vulnerability_type.lower()} "
                            "detected in this line."
                        ),
                        "vulnerable_snippet": line.strip(),
                    }
                )

    return findings


def check_hardcoded_secrets(code: str):
    findings = []

    pattern = re.compile(
        r"\b(api_key|apikey|password|passwd|secret_key|token)\b"
        r"\s*=\s*['\"][^'\"]{6,}['\"]",
        re.IGNORECASE,
    )

    for line_number, line in enumerate(code.splitlines(), start=1):
        if pattern.search(line):
            findings.append(
                {
                    "id": f"rule-{line_number}-hardcoded-secret",
                    "type": "Hardcoded Secret",
                    "severity": "HIGH",
                    "line": line_number,
                    "description": (
                        "A possible hardcoded credential or secret "
                        "was detected in source code."
                    ),
                    "vulnerable_snippet": line.strip(),
                }
            )

    return findings


def check_command_injection(code: str):
    findings = []

    pattern = re.compile(
        r"subprocess\.(run|call|Popen)\s*\([^)]*shell\s*=\s*True",
        re.IGNORECASE,
    )

    for line_number, line in enumerate(code.splitlines(), start=1):
        if pattern.search(line):
            findings.append(
                {
                    "id": f"rule-{line_number}-command-injection",
                    "type": "Command Injection",
                    "severity": "HIGH",
                    "line": line_number,
                    "description": (
                        "A subprocess call uses shell=True, which can "
                        "allow command injection when input is untrusted."
                    ),
                    "vulnerable_snippet": line.strip(),
                }
            )

    return findings


def run_all_rules(code: str):
    findings = []

    findings.extend(check_dangerous_functions(code))
    findings.extend(check_hardcoded_secrets(code))
    findings.extend(check_command_injection(code))

    return findings