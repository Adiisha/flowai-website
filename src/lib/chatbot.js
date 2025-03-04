
// Chatbot functionality
export const initChatbot = () => {
  // Initialize history from localStorage
  window.chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  
  // Add event listeners
  document.getElementById("userInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
  
  document.getElementById("askButton")?.addEventListener("click", () => sendMessage());
  document.getElementById("copyButton")?.addEventListener("click", () => copyResponse());
  document.getElementById("historyButton")?.addEventListener("click", () => toggleHistory());
  document.getElementById("clearChatButton")?.addEventListener("click", () => clearChat());
  document.getElementById("clearHistoryButton")?.addEventListener("click", () => clearHistory());
  
  // Update history display
  updateHistory();
};

// Update chat history display
export const updateHistory = () => {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;
  
  historyList.innerHTML = "";
  window.chatHistory.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg.text;
    li.onclick = function () {
      sendMessage(msg.text, false);
    };
    historyList.appendChild(li);
  });
};

// Clear chat messages
export const clearChat = () => {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("userInput");
  const copyButton = document.getElementById("copyButton");
  
  if (chatBox) chatBox.innerHTML = "";
  if (userInput) userInput.value = "";
  if (copyButton) copyButton.style.display = "none";
};

// Clear history
export const clearHistory = () => {
  window.chatHistory = [];
  localStorage.removeItem("chatHistory");
  const historyList = document.getElementById("historyList");
  if (historyList) historyList.innerHTML = "";
};

// Toggle history display
export const toggleHistory = () => {
  const historyDiv = document.getElementById("history");
  if (historyDiv) {
    historyDiv.style.display = historyDiv.style.display === "none" ? "block" : "none";
  }
};

// Send message to chatbot
export const sendMessage = async (inputText = null, saveToHistory = true) => {
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");
  const askButton = document.getElementById("askButton");
  const copyButton = document.getElementById("copyButton");
  
  if (!userInput || !chatBox || !askButton || !copyButton) return;
  
  const input = inputText || userInput.value;
  
  if (!input) return;
  
  const userMessage = document.createElement("div");
  userMessage.classList.add("chat-bubble", "user");
  userMessage.innerHTML = input;
  chatBox.appendChild(userMessage);
  
  userInput.value = "";
  
  const loadingBubble = document.createElement("div");
  loadingBubble.classList.add("chat-bubble", "bot", "loading");
  loadingBubble.innerHTML = `<span class="loader"></span>`;
  chatBox.appendChild(loadingBubble);
  
  askButton.disabled = true;
  
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: input }],
        }),
      }
    );
    
    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content || "No response received.";
    
    chatBox.removeChild(loadingBubble);
    
    const botMessage = document.createElement("div");
    botMessage.classList.add("chat-bubble", "bot");
    botMessage.innerHTML = botReply;
    chatBox.appendChild(botMessage);
    
    copyButton.style.display = "inline-block";
    
    if (saveToHistory) {
      window.chatHistory.push({ text: input, response: botReply });
      localStorage.setItem("chatHistory", JSON.stringify(window.chatHistory));
      updateHistory();
    }
  } catch (error) {
    chatBox.removeChild(loadingBubble);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("chat-bubble", "bot");
    errorMessage.innerHTML = "Error: " + error.message;
    chatBox.appendChild(errorMessage);
  }
  
  askButton.disabled = false;
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Copy response to clipboard
export const copyResponse = () => {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;
  
  const responseText = chatBox.innerText;
  navigator.clipboard.writeText(responseText).then(() => {
    alert("Response copied to clipboard!");
  });
};

// Speech recognition
export const startSpeechRecognition = () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }
  
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";
  
  recognition.start();
  
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    const userInput = document.getElementById("userInput");
    if (userInput) userInput.value = transcript;
  };
  
  recognition.onerror = function (event) {
    alert("Speech recognition error: " + event.error);
  };
};
