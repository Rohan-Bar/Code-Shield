/* =========================================================
   CODESHIELD — ANALYZER
   Connects Monaco Editor → API → Results UI
========================================================= */

const analyzeBtn = document.getElementById("analyzeBtn");


/* =========================================================
   ANALYZE CODE
========================================================= */

async function analyzeCode() {

    // Get code from Monaco if available
    let code = "";

    if (typeof getEditorCode === "function") {
        code = getEditorCode();
    }

    // Fallback to textarea
    if (!code) {
        const codeInput = document.getElementById("codeInput");

        if (codeInput) {
            code = codeInput.value;
        }
    }

    code = code.trim();

    if (!code) {
        alert("Please paste or type some code first.");
        return;
    }


    /* -----------------------------------------------------
       Get selected language
    ----------------------------------------------------- */

    const languageElement = document.getElementById("language");

    const language = languageElement
        ? languageElement.value
        : "python";


    /* -----------------------------------------------------
       Disable button
    ----------------------------------------------------- */

    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = "Analyzing...";
    }


    try {

        console.log("Sending code to backend...");
        console.log("Language:", language);


        /* -------------------------------------------------
           Call API.js
        ------------------------------------------------- */

        const data = await analyzeCodeAPI(code, language);


        console.log("Backend analysis:", data);


        /* -------------------------------------------------
           Display results
        ------------------------------------------------- */

        displayResults(data);


    } catch (error) {

        console.error("Analysis failed:", error);

        alert(
            "Could not connect to the backend.\n\n" +
            "Make sure FastAPI is running on http://127.0.0.1:8000"
        );

    } finally {

        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = "Analyze Code";
        }

    }
}


/* =========================================================
   DISPLAY RESULTS
========================================================= */

function displayResults(data) {

    console.log("Issues:", data.issues);
    console.log("Complexity:", data.complexity);
    console.log("Diff:", data.diff);


    /* =====================================================
       ISSUES
    ===================================================== */

    const issueContainer =
        document.getElementById("issuesList");

    if (issueContainer) {

        issueContainer.innerHTML = "";

        const issues = Array.isArray(data.issues)
            ? data.issues
            : [];


        /* No vulnerabilities */

        if (issues.length === 0) {

            issueContainer.innerHTML = `
                <div class="no-issues">
                    ✅ No vulnerabilities found
                </div>
            `;

        }

        /* Vulnerabilities found */

        else {

            issues.forEach((issue) => {

                const card =
                    document.createElement("div");

                card.className = "issue-card";


                const severity =
                    issue.severity || "UNKNOWN";


                card.innerHTML = `
                    <div class="issue-header">

                        <strong>
                            ${escapeHTML(issue.type || "Security Issue")}
                        </strong>

                        <span class="severity ${severity.toLowerCase()}">
                            ${escapeHTML(severity)}
                        </span>

                    </div>

                    <p>
                        <strong>Line:</strong>
                        ${issue.line || "N/A"}
                    </p>

                    <p>
                        ${escapeHTML(
                            issue.description ||
                            "No description available."
                        )}
                    </p>

                    <pre><code>${escapeHTML(
                        issue.vulnerable_snippet || ""
                    )}</code></pre>
                `;


                issueContainer.appendChild(card);

            });

        }
    }


    /* =====================================================
       ISSUE COUNT
    ===================================================== */

    const issueCount =
        document.getElementById("issueCount");

    if (issueCount) {

        const count =
            Array.isArray(data.issues)
                ? data.issues.length
                : 0;

        issueCount.textContent = count;

    }


    /* =====================================================
       AI ISSUE SUMMARY
    ===================================================== */

    if (data.issues && data.issues.length > 0) {

        const firstIssue = data.issues[0];


        const severityElement =
            document.getElementById("aiIssueSeverity");

        if (severityElement) {

            severityElement.textContent =
                firstIssue.severity || "UNKNOWN";

        }


        const titleElement =
            document.getElementById("aiIssueTitle");

        if (titleElement) {

            titleElement.textContent =
                firstIssue.type || "Security Issue";

        }

    }


    /* =====================================================
       COMPLEXITY
    ===================================================== */

    if (data.complexity) {

        const timeElement =
            document.getElementById("timeComplexity");

        if (timeElement) {

            timeElement.textContent =
                data.complexity.time || "N/A";

        }


        const spaceElement =
            document.getElementById("spaceComplexity");

        if (spaceElement) {

            spaceElement.textContent =
                data.complexity.space || "N/A";

        }


        const bottleneckElement =
            document.getElementById("bottleneckLines");

        if (bottleneckElement) {

            bottleneckElement.textContent =
                data.complexity.bottleneck_lines || "N/A";

        }

    }


    /* =====================================================
       SECURE CODE DIFF
    ===================================================== */

    if (data.diff) {

        const diffVulnerable =
            document.getElementById("vulnerableCode");

        if (diffVulnerable) {

            const vulnerable =
                Array.isArray(data.diff.vulnerable)
                    ? data.diff.vulnerable.join("\n")
                    : data.diff.vulnerable || "";

            diffVulnerable.textContent =
                vulnerable;

        }


        const diffSecure =
            document.getElementById("secureCode");

        if (diffSecure) {

            const secure =
                Array.isArray(data.diff.secure)
                    ? data.diff.secure.join("\n")
                    : data.diff.secure || "";

            diffSecure.textContent =
                secure;

        }

    }


    /* =====================================================
       MONACO ISSUE HIGHLIGHTING
    ===================================================== */

    if (
        typeof setIssueDecorations === "function" &&
        Array.isArray(data.issues)
    ) {

        setIssueDecorations(data.issues);

    }


    /* =====================================================
       MONACO BOTTLENECK HIGHLIGHTING
    ===================================================== */

    if (
        typeof setBottleneckDecoration === "function" &&
        data.complexity
    ) {

        setBottleneckDecoration(
            data.complexity.bottleneck_lines
        );

    }

}


/* =========================================================
   ESCAPE HTML
   Prevents code/description from being interpreted as HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   ANALYZE BUTTON
========================================================= */

if (analyzeBtn) {

    analyzeBtn.addEventListener(
        "click",
        analyzeCode
    );

}