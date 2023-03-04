const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const age = document.querySelector("input[name='age']:checked").value;
  chrome.runtime.sendMessage({ type: "summarizeText", age });
});





// In the popup window script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "summarizedText") {
    const summarizedTextElement = document.getElementById("summarized-text");
    summarizedTextElement.textContent = message.summarizedText;
  }
});
