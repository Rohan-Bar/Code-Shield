# 🛡️ CodeShield AI

### AI-Powered Source Code Security Analyzer

> **Detect vulnerabilities. Understand the risk. Fix the code securely.**

CodeShield AI is an intelligent source-code security analysis platform that combines **static security rules, Large Language Models (LLMs), complexity analysis, and secure-code generation** to help developers identify and understand security vulnerabilities in their source code.

Instead of simply reporting an error, CodeShield explains **what went wrong, why it matters, how it can be exploited, and how to fix it**.

---

## 🚀 Key Features

| Feature                          | Description                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| 🔍 **Static Security Analysis**  | Detects common dangerous coding patterns using predefined security rules |
| 🤖 **AI Vulnerability Analysis** | Uses Groq-powered LLM analysis to identify and explain security issues   |
| 🧠 **AI Security Assistant**     | Ask questions about detected vulnerabilities directly from the interface |
| 🔐 **Secure Code Suggestions**   | Generates safer alternatives for vulnerable code                         |
| 📊 **Complexity Analysis**       | Estimates time and space complexity and identifies potential bottlenecks |
| 📝 **Vulnerability Details**     | Displays severity, type, affected line, evidence and explanation         |
| 🔄 **Code Diff**                 | Compares vulnerable code with suggested secure code                      |
| 🐙 **GitHub Integration**        | Designed to import source code from GitHub repositories                  |
| 💻 **Interactive Code Editor**   | Provides an in-browser code editing and analysis experience              |
| ⚡ **FastAPI Backend**            | Provides REST APIs connecting the frontend with analysis services        |
| 🗄️ **PostgreSQL Support**       | Provides a persistent database layer for application data                |

---

# 🎯 Problem Statement

Modern applications are built rapidly, but security vulnerabilities can easily be introduced during development.

Common issues include:

* 🔴 Code injection
* 🔴 Command injection
* 🔴 Hardcoded secrets
* 🔴 Insecure deserialization
* 🟠 Unsafe input handling
* 🟠 Vulnerable coding patterns
* 🟠 Poorly designed security practices

Traditional static analyzers can identify patterns, but developers may still struggle to understand:

> **Why is this code dangerous?**

> **How could it be abused?**

> **How should I fix it?**

CodeShield AI addresses this gap by combining **deterministic security rules with AI-powered contextual analysis**.

---

# 💡 Our Solution

CodeShield follows a multi-layer analysis approach.

```text
                 ┌─────────────────────┐
                 │     Developer       │
                 │   Source Code       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   CodeShield UI     │
                 │ HTML/CSS/JavaScript │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     FastAPI         │
                 │      Backend        │
                 └──────────┬──────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
   ┌─────────────────────┐       ┌─────────────────────┐
   │ Static Rule Engine  │       │      Groq LLM       │
   │                     │       │                     │
   │ Pattern Detection   │       │ Contextual Analysis │
   │ Regex Rules         │       │ Explanation         │
   └──────────┬──────────┘       └──────────┬──────────┘
              │                             │
              └──────────────┬──────────────┘
                             ▼
                  ┌─────────────────────┐
                  │ Result Validation   │
                  │      Pydantic       │
                  └──────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌────────────┐ ┌────────────┐ ┌──────────────┐
       │ Complexity │ │ Secure Code│ │ Vulnerability│
       │  Analysis  │ │ / Diff     │ │ Explanation  │
       └─────┬──────┘ └─────┬──────┘ └──────┬───────┘
             │              │               │
             └──────────────┼───────────────┘
                            ▼
                 ┌─────────────────────┐
                 │   Security Report    │
                 │                     │
                 │ Severity            │
                 │ Vulnerability       │
                 │ Explanation         │
                 │ Secure Fix          │
                 └─────────────────────┘
```

---

# 🏗️ System Architecture

```mermaid
flowchart TD

    A[👨‍💻 Developer] --> B[💻 CodeShield Frontend]

    B --> C[⚡ FastAPI Backend]

    C --> D[🔍 Static Security Rule Engine]
    C --> E[🤖 Groq LLM]
    C --> F[📊 Complexity Analyzer]

    D --> G[🧩 Result Aggregation]
    E --> G
    F --> G

    G --> H[✅ Pydantic Validation]

    H --> I[🔐 Secure Code Generation]
    H --> J[📋 Vulnerability Report]
    H --> K[📈 Complexity Report]
    H --> L[💬 AI Explanation]

    I --> M[🖥️ Frontend Dashboard]
    J --> M
    K --> M
    L --> M

    C --> N[(🐘 PostgreSQL)]
```

---

# 🔄 Analysis Workflow

```mermaid
sequenceDiagram

    participant U as 👨‍💻 User
    participant F as 💻 Frontend
    participant API as ⚡ FastAPI
    participant R as 🔍 Rule Engine
    participant AI as 🤖 Groq LLM
    participant V as ✅ Validator
    participant DB as 🐘 PostgreSQL

    U->>F: Paste source code
    U->>F: Click Analyze

    F->>API: POST /api/analyze

    API->>R: Run security rules
    R-->>API: Static findings

    API->>AI: Analyze source code
    AI-->>API: AI findings

    API->>V: Validate AI response

    V-->>API: Validated result

    API->>DB: Store application data

    API-->>F: Analysis result

    F-->>U: Display security report
```

---

# 🧠 Two-Layer Security Detection

CodeShield uses two complementary approaches.

## 1️⃣ Static Rule Engine

The rule engine provides deterministic detection for known dangerous patterns.

Current examples include:

```python
eval(user_input)
```

```python
exec(user_code)
```

```python
os.system(command)
```

```python
pickle.loads(data)
```

```python
password = "SuperSecret123"
```

```python
subprocess.run(command, shell=True)
```

### Why static rules?

Static rules provide:

* ⚡ Fast detection
* 🎯 Deterministic results
* 🔒 No dependency on AI availability
* 📌 Exact vulnerable lines
* 🧪 Easy testing

---

# 🤖 AI-Powered Analysis

The Groq LLM provides contextual analysis beyond simple pattern matching.

The AI can analyze:

* Vulnerability context
* Security impact
* Potential abuse scenarios
* Secure coding recommendations
* OWASP categorization
* Developer questions
* Secure-code alternatives

The current LLM integration uses:

```text
Provider: Groq
Model: openai/gpt-oss-20b
```

---

# 💬 AI Security Assistant

CodeShield includes an interactive AI assistant.

After a vulnerability is detected, developers can ask questions such as:

> **Why is eval() dangerous?**

> **How can this vulnerability be exploited?**

> **How do I fix this code securely?**

> **What should I use instead of eval()?**

> **Explain this vulnerability in simple terms.**

The assistant responds using the detected vulnerability as context.

---

# 🔐 Secure Code Generation

CodeShield does not stop at detection.

It also provides a safer implementation where applicable.

### Vulnerable

```python
user_input = input("Enter an expression: ")
result = eval(user_input)

print("Result:", result)
```

### Safer alternative

```python
import ast

user_input = input("Enter an expression: ")

try:
    result = ast.literal_eval(user_input)
    print(result)
except (ValueError, SyntaxError):
    print("Invalid input")
```

This allows developers to understand the difference between the vulnerable implementation and a safer approach.

---

# 📊 Complexity Analysis

CodeShield also provides an approximate complexity analysis.

Example:

```text
Time Complexity:  O(n)
Space Complexity: O(1)

Potential Bottleneck:
Line 12
```

This helps developers consider both:

```text
🔐 Security
+
⚡ Performance
```

within the same development workflow.

> Complexity analysis is heuristic and should be treated as an estimate rather than a formal proof of algorithmic complexity.

---

# 🧩 Project Architecture

```text
CodeShield/
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── analyzer/
│   │   │   ├── analyse.py
│   │   │   ├── code_parser.py
│   │   │   ├── complexity_analyzer.py
│   │   │   ├── rules.py
│   │   │   └── security_analyzer.py
│   │   │
│   │   ├── api/
│   │   │   └── analyze.py
│   │   │
│   │   ├── llm/
│   │   │   ├── groq_provider.py
│   │   │   ├── parser.py
│   │   │   ├── prompts.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   │
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── .env
│   ├── requirement.txt
│   └── test_groq.py
│
├── frontend/
│   │
│   ├── html_files/
│   │   └── analyzer.html
│   │
│   ├── css_files/
│   │   └── ...
│   │
│   └── js_files/
│       ├── api.js
│       ├── analyzer.js
│       ├── editor.js
│       ├── github.js
│       └── script.js
│
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

* 🌐 HTML5
* 🎨 CSS3
* ⚙️ JavaScript
* 📝 Monaco Editor

## Backend

* 🐍 Python
* ⚡ FastAPI
* 🚀 Uvicorn
* 🧩 Pydantic

## Artificial Intelligence

* 🤖 Groq API
* 🧠 `openai/gpt-oss-20b`

## Database

* 🐘 PostgreSQL
* 🔗 SQLAlchemy

## Security Analysis

* 🔍 Custom Python rule engine
* 🧠 LLM-based contextual analysis
* 🛡️ OWASP-oriented vulnerability classification

## Development Tools

* 🐙 Git / GitHub
* 💻 Visual Studio Code
* 📡 REST APIs

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CodeShield
```

---

## 2️⃣ Create a Python virtual environment

```bash
cd backend

python -m venv .venv
```

### Windows

```cmd
.venv\Scripts\activate
```

---

## 3️⃣ Install dependencies

```bash
pip install -r requirement.txt
```

---

# 🔑 Environment Configuration

Create a `.env` file inside the `backend` directory.

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b

DATABASE_URL=postgresql://username:password@localhost:5432/codeshield
```

⚠️ **Never commit your `.env` file to GitHub.**

Add it to `.gitignore`:

```gitignore
.env
.venv/
__pycache__/
*.pyc
```

---

# ▶️ Running the Backend

From the `backend` directory:

```cmd
python -m uvicorn app.main:app --reload
```

The API will start at:

```text
http://127.0.0.1:8000
```

### Health Check

Open:

```text
http://127.0.0.1:8000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

# 📚 API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

Main endpoints include:

```text
POST /api/analyze
POST /api/explain
```

---

# 💻 Running the Frontend

Open another terminal.

```cmd
cd frontend
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500/html_files/analyzer.html
```

> Do not open the HTML file directly using `file://`. Use the local HTTP server so browser API requests work correctly.

---

# 🧪 Testing CodeShield

Try the following vulnerable Python code:

```python
user_input = input("Enter an expression: ")
result = eval(user_input)

print("Result:", result)
```

Click:

```text
🔍 Analyze Code
```

Expected result:

```text
Vulnerability:
Code Injection

Severity:
HIGH

Evidence:
result = eval(user_input)
```

Then try the AI assistant:

```text
Why is eval() dangerous?
```

or:

```text
How do I fix this vulnerability securely?
```

---

# 🧪 Additional Test Cases

## 🔴 Code Injection

```python
user_code = input("Enter code: ")
exec(user_code)
```

---

## 🔴 Command Injection

```python
import os

command = input("Enter command: ")
os.system(command)
```

---

## 🔴 Insecure Deserialization

```python
import pickle

data = input("Enter data: ")
result = pickle.loads(data)
```

---

## 🔴 Hardcoded Secret

```python
password = "SuperSecret123"

print(password)
```

---

## 🔴 Command Injection via subprocess

```python
import subprocess

command = input("Enter command: ")
subprocess.run(command, shell=True)
```

---

# 🔄 End-to-End Data Flow

```mermaid
flowchart LR

    A[🧑‍💻 Source Code] --> B[🌐 Frontend]

    B -->|POST /api/analyze| C[⚡ FastAPI]

    C --> D[🔍 Static Rules]
    C --> E[🤖 Groq AI]
    C --> F[📊 Complexity]

    D --> G[📦 Aggregated Analysis]
    E --> G
    F --> G

    G --> H[✅ Pydantic Validation]

    H --> I[🔐 Secure Code]
    H --> J[📋 Vulnerability Report]
    H --> K[📈 Complexity]
    H --> L[💬 AI Assistant]

    I --> M[🖥️ Dashboard]
    J --> M
    K --> M
    L --> M
```

---

# 🛡️ Security Analysis Architecture

```mermaid
graph TD

    CODE["💻 Source Code"]

    CODE --> RULES["🔍 Static Rules"]
    CODE --> LLM["🤖 AI Analysis"]

    RULES --> EVAL["eval / exec"]
    RULES --> CMD["os.system"]
    RULES --> PICKLE["pickle.loads"]
    RULES --> SECRET["Hardcoded Secrets"]
    RULES --> SHELL["shell=True"]

    LLM --> CONTEXT["🧠 Contextual Analysis"]
    LLM --> OWASP["🛡️ OWASP Mapping"]
    LLM --> FIX["🔧 Secure Fix"]

    EVAL --> REPORT["📋 Security Report"]
    CMD --> REPORT
    PICKLE --> REPORT
    SECRET --> REPORT
    SHELL --> REPORT
    CONTEXT --> REPORT
    OWASP --> REPORT
    FIX --> REPORT
```

---

# 📋 Example Analysis Response

CodeShield returns structured analysis data similar to:

```json
{
  "analysis_id": "analysis-id",
  "issues": [
    {
      "id": "rule-2-code-injection",
      "type": "Code Injection",
      "severity": "HIGH",
      "line": 2,
      "description": "Potential code injection detected in this line.",
      "vulnerable_snippet": "eval(user_input)"
    }
  ],
  "llm_issues": [
    {
      "type": "Code Injection",
      "severity": "HIGH",
      "description": "Using eval on user input allows arbitrary code execution.",
      "evidence": "eval(user_input)",
      "secure_fix": "Replace eval with a safe parser."
    }
  ],
  "complexity": {
    "time": "O(1)",
    "space": "O(1)"
  }
}
```

---

# 🧱 Design Philosophy

CodeShield is designed around four principles:

### 🔍 Detect

Find potentially vulnerable code.

### 🧠 Explain

Help developers understand the security problem.

### 🔐 Fix

Provide practical secure alternatives.

### 📈 Improve

Consider code quality and complexity alongside security.

---

# 🌟 What Makes CodeShield Different?

Traditional vulnerability detection often focuses on:

```text
❌ Finding the problem
```

CodeShield aims to provide:

```text
🔍 Detect
     ↓
🧠 Understand
     ↓
⚠️ Assess Risk
     ↓
🔧 Fix
     ↓
✅ Learn
```

The combination of **deterministic rules + AI reasoning + developer interaction** creates a more educational security-analysis workflow.

---

# 🔮 Future Roadmap

Potential future improvements include:

* 🔐 JWT and authentication vulnerability detection
* 🗄️ SQL injection detection
* 🌐 XSS detection
* 📂 Path traversal detection
* 🌍 SSRF detection
* 🛡️ CSRF analysis
* 📦 Dependency vulnerability scanning
* 🐙 Deeper GitHub repository scanning
* 🔄 Multi-file project analysis
* 📊 Security history dashboard
* 👥 Team collaboration
* 📄 PDF security reports
* 🔔 Real-time vulnerability alerts
* 🔧 Automated secure-code patches
* 🚀 CI/CD pipeline integration
* 🐳 Docker deployment
* ☁️ Cloud deployment

---

# 📌 Current Scope

CodeShield's current static rule engine focuses on selected patterns including:

```text
eval()
exec()
os.system()
pickle.loads()
Hardcoded secrets
subprocess(..., shell=True)
```

The AI layer can identify additional security concerns depending on the submitted code and model response.

Therefore, CodeShield should be considered a **developer-assistance security analyzer**, not a replacement for a complete enterprise-grade security testing suite.

---

# 👥 Team Workflow

A typical development workflow looks like:

```text
                 GitHub
                    │
                    ▼
             ┌─────────────┐
             │ Development │
             └──────┬──────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Frontend              Backend
          │                   │
          └─────────┬─────────┘
                    ▼
               Integration
                    │
                    ▼
                  Testing
                    │
                    ▼
                 Deployment
```

---

# 🧑‍💻 Development

Start the backend:

```cmd
cd backend
.venv\Scripts\activate
python -m uvicorn app.main:app --reload
```

Start the frontend:

```cmd
cd frontend
python -m http.server 5500
```

Then visit:

```text
http://127.0.0.1:5500/html_files/analyzer.html
```

---

# 🤝 Contributing

Contributions are welcome.

Typical contribution workflow:

```bash
git checkout -b feature/new-security-rule
```

Make your changes and test them.

Then:

```bash
git add .
git commit -m "Add new security detection rule"
git push origin feature/new-security-rule
```

Open a Pull Request on GitHub.

---

# ⚠️ Disclaimer

CodeShield is intended for **educational, development, and defensive security purposes**.

Security findings are generated using a combination of predefined rules and AI analysis. AI-generated results may contain false positives or false negatives.

Always manually verify security findings before deploying production software.

Only analyze source code that you are authorized to inspect.

---

# 📜 License

Add your preferred license here.

Example:

```text
MIT License
```

---

# 🏆 Project Summary

**CodeShield AI** brings together:

```text
💻 Modern Web Interface
        +
⚡ FastAPI
        +
🔍 Static Security Rules
        +
🤖 Generative AI
        +
🧠 Complexity Analysis
        +
🔐 Secure-Code Suggestions
        +
💬 Interactive AI Assistant
        =
🛡️ CodeShield AI
```

### Built to help developers write **safer, smarter, and more secure code.** 🚀🔐

---

<p align="center">

### 🛡️ CodeShield AI

**Detect • Understand • Fix • Secure**

</p>
