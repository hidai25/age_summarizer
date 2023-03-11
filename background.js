chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "summarizeText") {
    const { text, age } = request;
    summarizeText(text).then((summarizedText) => {
      chrome.runtime.sendMessage({ type: "summarizedText", summarizedText, age });
    });
  }
});

const summarizeText = async (text) => {
  try {
    // Using OpenAI's GPT-3 API to summarize the text
    const summarizedText = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer `
      },
      body: JSON.stringify({
        prompt: `Summarize this text:\n\n${text}`,
        max_tokens: 400,
        model: "text-davinci-003",
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        temperature: 0.35,
        top_p: 1
      })
    })
      .then(res => res.json())
      .then(data => data['choices'][0]['text']);

    return summarizedText;
  } catch (error) {
    console.error(error);
  }
};
