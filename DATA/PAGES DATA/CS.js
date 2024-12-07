// Chat Rooms Data
const chatRooms = [
    { name: "General", password: "1234" },
    { name: "Gaming", password: "5678" },
    { name: "Music", password: "91011" }
];

// Populate Chat Rooms
const chatList = document.getElementById("chat-rooms");

chatRooms.forEach((room, index) => {
    const li = document.createElement("li");
    li.textContent = room.name;
    li.onclick = () => promptPassword(index);
    chatList.appendChild(li);
});

// Prompt for Password
function promptPassword(index) {
    const userInput = prompt("Enter password for " + chatRooms[index].name);
    if (userInput === chatRooms[index].password) {
        loadChatRoom(chatRooms[index].name);
    } else {
        alert("Incorrect password!");
    }
}

// Load Chat Room
function loadChatRoom(name) {
    document.getElementById("chat-room-name").textContent = name;
    document.getElementById("chat-messages").innerHTML = ""; // Clear previous messages
}

// Send Message
function sendMessage() {
    const input = document.getElementById("message-input");
    const message = input.value.trim();

    if (message) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        document.getElementById("chat-messages").appendChild(messageDiv);
        input.value = "";
    }
}
