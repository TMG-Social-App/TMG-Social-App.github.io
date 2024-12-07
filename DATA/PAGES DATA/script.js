function loadChatRooms() {
    const chatListContainer = document.getElementById('chat-list');
    chatListContainer.innerHTML = ''; // Clear previous list

    const chatRoomsFilePath = 'CHATS/ChatRooms.txt';

    fetch(chatRoomsFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not fetch ${chatRoomsFilePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            let chatRooms;
            try {
                chatRooms = JSON.parse(data); // Ensure data is valid JSON
            } catch (err) {
                throw new Error('Invalid JSON structure in ChatRooms.txt');
            }

            if (!Array.isArray(chatRooms) || chatRooms.length === 0) {
                throw new Error('ChatRooms.txt is empty or not an array.');
            }

            chatRooms.forEach(chatRoom => {
                const chatItem = document.createElement('div');
                chatItem.classList.add('chat-item');

                const chatImage = document.createElement('img');
                chatImage.src = `CHATS/${chatRoom}.png`;
                chatImage.alt = `${chatRoom} Image`;
                chatImage.classList.add('chat-room-image');
                chatImage.onerror = () => {
                    chatImage.src = 'DATA/TEXTURES/placeholder.png'; // Fallback image
                };

                const chatTitle = document.createElement('p');
                chatTitle.innerText = chatRoom;
                chatTitle.classList.add('chat-room-title');

                chatItem.appendChild(chatImage);
                chatItem.appendChild(chatTitle);

                chatItem.addEventListener('click', () => loadChatContent(chatRoom));

                chatListContainer.appendChild(chatItem);
            });
        })
        .catch(error => {
            console.error('Error loading chat rooms:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Failed to load chat rooms.';
            chatListContainer.appendChild(errorMessage);
        });
}

function loadChatContent(chatRoomName) {
    const chatRoomImage = document.getElementById('chat-room-image');
    const chatRoomDescription = document.getElementById('chat-room-description');

    chatRoomImage.src = `CHATS/${chatRoomName}.png`;
    chatRoomImage.alt = `${chatRoomName} Image`;
    chatRoomImage.onerror = () => {
        chatRoomImage.src = 'DATA/TEXTURES/placeholder.png'; // Fallback image
    };

    chatRoomDescription.innerText = `Welcome to ${chatRoomName}!`; // Example description
}

document.addEventListener('DOMContentLoaded', loadChatRooms);
