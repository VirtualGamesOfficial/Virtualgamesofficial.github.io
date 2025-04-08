window.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("editor");
    const previewIframe = document.getElementById("preview");

    // Live update for the iframe
    editor.addEventListener("input", () => {
        const previewDocument = previewIframe.contentDocument || previewIframe.contentWindow.document;
        previewDocument.open();
        previewDocument.write(editor.value); // User's code
        previewDocument.close();
    });
});

function downloadCode() {
    const codeContent = document.getElementById("editor").value;
    const blob = new Blob([codeContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "project.html";
    link.click();
    URL.revokeObjectURL(link.href);
}

function loadCode() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".html";

    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                document.getElementById("editor").value = content;
                const previewIframe = document.getElementById("preview");
                const previewDocument = previewIframe.contentDocument || previewIframe.contentWindow.document;
                previewDocument.open();
                previewDocument.write(content);
                previewDocument.close();
            };
            reader.readAsText(file);
        }
    };

    fileInput.click();
}
