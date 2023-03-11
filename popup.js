


const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const radioButtons = document.querySelector(".radio-buttons-container");
const summarizedTextElement = document.getElementById("summarized-text");
const submitButton = document.getElementById("submit-buttons");

form.addEventListener("submit", (event) => {
  
  summarizedTextElement.style.display = "none";
  loader.style.display = "block";
  radioButtons.style.display = "none";
  // submitButton.style.display="none"

  event.preventDefault();

  // Hide radio buttons and display loader
  
  const age = document.querySelector("input[name='age']:checked").value;
  chrome.runtime.sendMessage({ type: "summarizeText", age });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "summarizedText") {
    summarizedTextElement.textContent = message.summarizedText;

    // Hide loader and display summarized text with age group
    radioButtons.style.display = "none";
    
    loader.style.display = "none";
    summarizedTextElement.insertAdjacentHTML(
      "afterbegin",
      // `Text summary for the age group: ${message.age}<br>`
      `Your text summary:<br>`
      
    );
    summarizedTextElement.style.display = "block";

    // Determine the width of the popup based on the length of the summarized text
    const textLength = summarizedTextElement.textContent.length;
    if (textLength < 200) {
      window.resizeTo(400, 300); // set smaller popup width
    } else if (textLength < 400) {
      window.resizeTo(600, 400); // set medium popup width
    } else {
      window.resizeTo(800, 500); // set larger popup width
    }
  }
});

// Update the width of the popup window when the size of the summarized text changes due to the loader being displayed or hidden
const resizePopup = () => {
  const textLength = summarizedTextElement.textContent.length;
  if (textLength < 200) {
    window.resizeTo(400, 300); // set smaller popup width
  } else if (textLength < 400) {
    window.resizeTo(600, 400); // set medium popup width
  } else {
    window.resizeTo(800, 500); // set larger popup width
  };
};

const observer = new MutationObserver(resizePopup);
observer.observe(summarizedTextElement, { attributes: true, childList: true, characterData: true });
