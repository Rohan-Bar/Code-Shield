```javascript
/* =========================================================
   CODESHIELD — API.JS
   ONLY FILE THAT HANDLES BACKEND REQUESTS
========================================================= */

const API_BASE_URL = "http://127.0.0.1:8000";


/* =========================================================
   ANALYZE CODE
========================================================= */

async function analyzeCodeAPI(code, language) {

    try {

        const response = await fetch(
            ${API_BASE_URL}/api/analyze,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code,
                    language: language
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                Server error: ${response.status}
            );

        }

        const data = await response.json();

        console.log("Analysis result:", data);

        return data;

    } catch (error) {

        console.error(
            "Analyze API error:",
            error
        );

        throw error;
    }
}


/* =========================================================
   EXPLAIN VULNERABILITY
========================================================= */

async function explainVulnerabilityAPI(
    vulnerabilityId,
    question
) {

    try {

        const response = await fetch(
            ${API_BASE_URL}/api/explain,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    vulnerability_id: vulnerabilityId,
                    question: question
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                Server error: ${response.status}
            );

        }

        const data = await response.json();

        console.log(
            "Explanation result:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "Explain API error:",
            error
        );

        throw error;
    }
}


/* =========================================================
   GITHUB FETCH
========================================================= */

async function fetchGitHubAPI(githubUrl) {

    try {

        const response = await fetch(
            ${API_BASE_URL}/api/github/fetch,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    github_url: githubUrl
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                Server error: ${response.status}
            );

        }

        const data = await response.json();

        console.log(
            "GitHub result:",
            data
        );

        return data;

    } catch (error) {

        console.error(
            "GitHub API error:",
            error
        );

        throw error;
    }
}


/* =========================================================
   HEALTH CHECK
========================================================= */

async function checkBackendHealth() {

    try {

        const response = await fetch(
            ${API_BASE_URL}/
        );

        if (!response.ok) {
            return false;
        }

        return true;

    } catch (error) {

        console.error(
            "Backend is not reachable:",
            error
        );

        return false;
    }
}
