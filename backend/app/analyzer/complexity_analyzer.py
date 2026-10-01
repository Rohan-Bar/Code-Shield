import re


def analyze_complexity(code: str):
    """
    Simple heuristic complexity analyzer.

    Detects nested loops and estimates:
    0 loops  -> O(1)
    1 loop   -> O(n)
    2 loops  -> O(n²)
    3+ loops -> O(n³)
    """

    lines = code.splitlines()

    max_nesting = 0
    current_nesting = 0

    bottleneck_start = None
    bottleneck_end = None

    for line_number, line in enumerate(lines, start=1):
        stripped = line.strip()

        # Ignore blank lines
        if not stripped:
            continue

        # Basic Python loop detection
        if re.match(r"^(for|while)\b", stripped):
            current_nesting += 1

            if current_nesting > max_nesting:
                max_nesting = current_nesting
                bottleneck_start = line_number

            bottleneck_end = line_number

        # Basic indentation-based nesting reduction
        elif current_nesting > 0:
            indentation = len(line) - len(line.lstrip())

            if indentation == 0:
                current_nesting = 0

    if max_nesting == 0:
        time_complexity = "O(1)"
        bottleneck_lines = ""

    elif max_nesting == 1:
        time_complexity = "O(n)"
        bottleneck_lines = f"{bottleneck_start}-{bottleneck_end}"

    elif max_nesting == 2:
        time_complexity = "O(n²)"
        bottleneck_lines = f"{bottleneck_start}-{bottleneck_end}"

    else:
        time_complexity = "O(n³)"
        bottleneck_lines = f"{bottleneck_start}-{bottleneck_end}"

    return {
        "time": time_complexity,
        "space": "O(1)",
        "bottleneck_lines": bottleneck_lines,
    }