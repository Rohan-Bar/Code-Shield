const response = await fetch("http://127.0.0.1:8000/api/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    code: code,
    language: language,
  }),
});

const data = await response.json();

console.log("Analysis result:", data);