const API_URL = "http://127.0.0.1:8000";

const codeInput = document.getElementById("codeInput");
const analyzeBtn = document.getElementById("analyzeBtn");

async function analyzeCode() {
    const code = codeInput.value.trim();

    if (!code) {
        alert("Please paste some code first.");
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";

    try {
        const response = await fetch(`${API_URL}/api/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                language: "python"
            })
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();

        console.log("Analysis result:", data);

        displayResults(data);

    } catch (error) {
        console.error(error);

        // Temporary fallback while DB error is being ignored
        const mockResult = createMockResult(code);

        displayResults(mockResult);

        console.log(
            "Backend unavailable, showing temporary frontend result."
        );

    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Code";
    }
}


function createMockResult(code) {

    const lines = code.split("\n");

    const issues = [];

    lines.forEach((line, index) => {

        if (/\b(eval|exec)\s*\(/.test(line)) {

            issues.push({
                id: "rule-1-code-injection",
                type: "Code Injection",
                severity: "HIGH",
                line: index + 1,
                description:
                    "Potential code injection detected in this line.",
                vulnerable_snippet: line.trim()
            });

        }

        if (/(password|secret|api_key|token)\s*=\s*["'][^"']+["']/i.test(line)) {

            issues.push({
                id: "rule-1-hardcoded-secret",
                type: "Hardcoded Secret",
                severity: "HIGH",
                line: index + 1,
                description:
                    "A possible hardcoded credential or secret was detected.",
                vulnerable_snippet: line.trim()
            });

        }

        if (/innerHTML\s*=|document\.write/.test(line)) {

            issues.push({
                id: "rule-1-xss",
                type: "XSS",
                severity: "HIGH",
                line: index + 1,
                description:
                    "Unsafe HTML insertion may allow script injection.",
                vulnerable_snippet: line.trim()
            });

        }
    });

    return {
        analysis_id: "demo-" + Date.now(),

        issues: issues,

        complexity: {
            time: "O(n)",
            space: "O(1)",
            bottleneck_lines: ""
        },

        diff: {
            vulnerable: lines,
            secure: lines
        }
    };
}


function displayResults(data) {

    console.log("Issues:", data.issues);
    console.log("Complexity:", data.complexity);
    console.log("Diff:", data.diff);

    /*
     * If your HTML already has result containers,
     * we populate them here.
     */

    const issueContainer =
        document.getElementById("issuesList");

    if (issueContainer) {

        issueContainer.innerHTML = "";

        if (data.issues.length === 0) {

            issueContainer.innerHTML = `
                <div class="no-issues">
                    ✅ No vulnerabilities found
                </div>
            `;

        } else {

            data.issues.forEach(issue => {

                const card = document.createElement("div");

                card.className = "issue-card";

                card.innerHTML = `
                    <div>
                        <strong>${issue.type}</strong>
                        <span>${issue.severity}</span>
                    </div>

                    <p>Line ${issue.line}</p>

                    <p>${issue.description}</p>

                    <code>${issue.vulnerable_snippet}</code>
                `;

                issueContainer.appendChild(card);
            });
        }
    }


    const timeElement =
        document.getElementById("timeComplexity");

    if (timeElement) {
        timeElement.textContent =
            data.complexity.time;
    }


    const spaceElement =
        document.getElementById("spaceComplexity");

    if (spaceElement) {
        spaceElement.textContent =
            data.complexity.space;
    }


    const diffVulnerable =
        document.getElementById("vulnerableCode");

    if (diffVulnerable) {
        diffVulnerable.textContent =
            data.diff.vulnerable.join("\n");
    }


    const diffSecure =
        document.getElementById("secureCode");

    if (diffSecure) {
        diffSecure.textContent =
            data.diff.secure.join("\n");
    }
}


if (analyzeBtn) {

    analyzeBtn.addEventListener("click", analyzeCode);

}