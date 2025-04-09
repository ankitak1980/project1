
function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage("You", message);
    userInput.value = "";

    showTyping();

    setTimeout(() => {
        const response = getBotResponse(message);
        removeTyping();
        appendMessage("Bot", response);
    }, 800);
}

function appendMessage(sender, message) {
    const chatlog = document.getElementById("chatlog");
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "You" ? "msg user" : "msg bot";
    const avatar = sender === "You" ? "👤" : "🤖";
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
        <div class="bubble">
            <span class="avatar">${avatar}</span>
            <div class="text">
                <p>${message}</p>
                <span class="timestamp">${time}</span>
            </div>
        </div>`;
    
    chatlog.appendChild(msgDiv);
    chatlog.scrollTop = chatlog.scrollHeight;
}

function showTyping() {
    const chatlog = document.getElementById("chatlog");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing";
    typingDiv.className = "msg bot";
    typingDiv.innerHTML = `
        <div class="bubble">
            <span class="avatar">🤖</span>
            <div class="text"><p><em>Typing...</em></p></div>
        </div>`;
    chatlog.appendChild(typingDiv);
    chatlog.scrollTop = chatlog.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function getBotResponse(input) {
    const lower = input.toLowerCase();

    if (/^(hello|hi|hey)\b/.test(lower)) {
        return "Hello! How can I assist you in planning your travel today?";
    } else if (lower.includes("package")) {
        return "We offer exciting packages to Chandigarh, Goa, and Shimla. Want details on one?";
    } else if (lower.includes("nearby") || lower.includes("flexi")) {
        return "Please tell me your current city. I’ll suggest attractions within 50–100 km.";
    } else if (lower.includes("Chandigarh")) {
        return "Chandigarh is famous for the giant Open Hand Monument. The nearby Rock Garden is a park featuring sculptures made of stones, recycled ceramics and industrial relics";
    } else if (lower.includes("goa")) {
        return "Goa is known for its beaches (Baga, Anjuna), forts, and nightlife.";
    } else if (lower.includes("Shimla")) {
        return "Shimla is perfect for snow, adventure sports, and views like Solang Valley.";
    } else if (lower.includes("help")) {
        return "Try: 'packages', 'nearby', or ask about 'Chandigarh', 'Shimla', 'Delhi' or 'Goa'.";
    } else {
        return "I didn’t get that. Type 'help' for suggestions.";
    }
}
