const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const codeInput = document.getElementById("codeInput");
const analyzeBtn = document.getElementById("analyzeBtn");

/* ---------- UI helpers ---------- */

function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = "msg " + role;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const div = document.createElement("div");
    div.className = "msg bot typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

/* ---------- Mock scanner (replace with backend later) ---------- */

const RULES = [
    {
        name: "SQL Injection (A03)",
        test: /(select|insert|update|delete)[^;\n]*(\+|%s|\$\{|f")/i,
        why: "User input is concatenated into a SQL query, so an attacker can change the query. Use parameterized queries instead."
    },
    {
        name: "Hardcoded Secret (A02)",
        test: /(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"']{6,}["']/i,
        why: "Credentials in source code leak through version control. Load them from environment variables."
    },
    {
        name: "Code Injection (A03)",
        test: /\b(eval|exec)\s*\(/,
        why: "eval/exec run arbitrary code. If input reaches them, an attacker can run commands on your system."
    },
    {
        name: "XSS (A03)",
        test: /(innerHTML|document\.write)\s*[=(]/,
        why: "Writing raw input into the page lets attackers inject scripts. Use textContent or sanitize the input."
    },
    {
        name: "Insecure Deserialization (A08)",
        test: /(pickle\.loads|yaml\.load\(|ObjectInputStream)/,
        why: "Deserializing untrusted data can execute code. Use safe formats like JSON."
    }
];

function scanCode(code) {
    const lines = code.split("\n");
    const found = [];

    lines.forEach((line, i) => {
        RULES.forEach(rule => {
            if (rule.test.test(line)) {
                found.push(`• Line ${i + 1}: ${rule.name}\n  ${rule.why}`);
            }
        });
    });

    return found;
}

/* ---------- The ONLY function to swap for the real AI ---------- */

async function getAIReply(message, code) {
    await new Promise(r => setTimeout(r, 700));

    const wantsScan = /analy[sz]e|scan|check|review/i.test(message);

    if (!code.trim() && wantsScan) {
        return "Paste some code in the editor first, then click Analyze Code.";
    }

    if (wantsScan) {
        const found = scanCode(code);
        if (found.length === 0) {
            return "No obvious vulnerabilities found. This was a quick pattern scan; the full AI analysis will go deeper.";
        }
        return `I found ${found.length} potential issue(s):\n\n` + found.join("\n\n");
    }

    if (/why|explain|vulnerab/i.test(message)) {
        const found = scanCode(code);
        return found.length
            ? "Here is why your code is risky:\n\n" + found.join("\n\n")
            : "I don't see a specific issue yet. Paste your code and click Analyze Code, then ask again.";
    }

    return "I can scan your code for security issues and explain them. Paste code on the left and click Analyze Code, or ask me a question.";

    /* REAL VERSION (later):
    const res = await fetch("https://YOUR-BACKEND/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, code })
    });
    const data = await res.json();
    return data.reply;
    */
}

/* ---------- Send flow ---------- */

async function send(message) {
    addMessage("user", message);
    const typing = showTyping();

    try {
        const reply = await getAIReply(message, codeInput.value);
        typing.remove();
        addMessage("bot", reply);
    } catch (err) {
        typing.remove();
        addMessage("bot", "Something went wrong. Please try again.");
    }
}

chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    send(text);
});

analyzeBtn.addEventListener("click", () => send("Analyze my code"));

/* ---------- Greeting on open ---------- */

addMessage(
    "bot",
    "Hi! 👋 I'm CodeShield AI. Paste your code on the left and click Analyze Code, or ask me anything about security issues."
);