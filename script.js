// This function changes the text content of the paragraph with id="message"
function changeMessage() {
    // Find the paragraph by its ID
    const messageParagraph = document.getElementById("message");

    // Change the text content
    messageParagraph.textContent = "You clicked the button! 🎉";
}