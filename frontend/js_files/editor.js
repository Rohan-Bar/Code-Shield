/* =========================================================
   CODESHIELD — MONACO EDITOR
========================================================= */

let monacoEditor = null;


/* =========================================================
   INITIALIZE MONACO
========================================================= */

function initializeMonaco() {

    require.config({
        paths: {
            vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"
        }
    });


    require(
        ["vs/editor/editor.main"],
        function () {

            const editorContainer =
                document.getElementById("monacoEditor");


            if (!editorContainer) {
                console.error("Monaco container not found.");
                return;
            }


            monacoEditor = monaco.editor.create(
                editorContainer,
                {

                    value: `# Write or paste your code here

def login(username):
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
`,

                    language: "python",

                    theme: "vs-dark",

                    automaticLayout: true,

                    minimap: {
                        enabled: true
                    },

                    fontSize: 13,

                    lineHeight: 22,

                    tabSize: 4,

                    wordWrap: "off",

                    scrollBeyondLastLine: false,

                    padding: {
                        top: 15,
                        bottom: 15
                    },

                    suggestOnTriggerCharacters: true,

                    quickSuggestions: true,

                    renderWhitespace: "selection",

                    cursorBlinking: "smooth"

                }
            );


            console.log("Monaco Editor initialized.");

        }
    );

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeEditorLanguage(language) {

    if (!monacoEditor) {
        return;
    }


    const model = monacoEditor.getModel();

    if (!model) {
        return;
    }


    monaco.editor.setModelLanguage(
        model,
        language
    );

}


/* =========================================================
   GET CODE
========================================================= */

function getEditorCode() {

    if (!monacoEditor) {
        return "";
    }

    return monacoEditor.getValue();

}


/* =========================================================
   SET CODE
========================================================= */

function setEditorCode(code) {

    if (!monacoEditor) {
        return;
    }

    monacoEditor.setValue(code || "");

}


/* =========================================================
   CLEAR EDITOR
========================================================= */

function clearEditor() {

    if (!monacoEditor) {
        return;
    }

    monacoEditor.setValue("");

}


/* =========================================================
   ISSUE DECORATIONS
========================================================= */

function setIssueDecorations(issues) {

    if (!monacoEditor) {
        return;
    }


    const decorations = [];


    issues.forEach(issue => {

        if (!issue.line) {
            return;
        }


        decorations.push({

            range: new monaco.Range(
                issue.line,
                1,
                issue.line,
                1
            ),

            options: {

                isWholeLine: true,

                className: "codeshield-vulnerability-line",

                glyphMarginClassName:
                    "codeshield-vulnerability-glyph",

                overviewRuler: {
                    color: "#b91c1c",
                    position:
                        monaco.editor.OverviewRulerLane.Full
                },

                minimap: {
                    color: "#b91c1c",
                    position:
                        monaco.editor.MinimapPosition.Inline
                }

            }

        });

    });


    monacoEditor.deltaDecorations(
        [],
        decorations
    );

}


/* =========================================================
   BOTTLENECK DECORATIONS
========================================================= */

function setBottleneckDecoration(lineStart, lineEnd) {

    if (!monacoEditor) {
        return;
    }


    if (!lineStart || !lineEnd) {
        return;
    }


    const decorations = [];


    for (
        let line = lineStart;
        line <= lineEnd;
        line++
    ) {

        decorations.push({

            range: new monaco.Range(
                line,
                1,
                line,
                1
            ),

            options: {

                isWholeLine: true,

                className:
                    "codeshield-bottleneck-line"

            }

        });

    }


    monacoEditor.deltaDecorations(
        [],
        decorations
    );

}


/* =========================================================
   LANGUAGE SELECTOR
========================================================= */

const languageSelect =
    document.getElementById("language");


if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        function () {

            changeEditorLanguage(
                languageSelect.value
            );

        }
    );

}


/* =========================================================
   CLEAR BUTTON
========================================================= */

const clearCodeBtn =
    document.getElementById("clearCodeBtn");


if (clearCodeBtn) {

    clearCodeBtn.addEventListener(
        "click",
        function () {

            clearEditor();

        }
    );

}


/* =========================================================
   START MONACO
========================================================= */

initializeMonaco();