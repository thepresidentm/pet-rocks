// Animation
let roomContainer = document.getElementById("container-room");
let gameContainer = document.getElementById("container-game");

// Rooms
let btnJoin = document.getElementById("join");
let btnCreate = document.getElementById("create");
let containerId = document.getElementById("container-id");

    // Create Room
btnCreate.addEventListener("click", () =>{
    socket.emit("room:create");
    // roomContainer.style.display = "none";
    // gameContainer.style.display = "block";
});

    // Receive Room Id
socket.on("room:id", (id) => {
    containerId.innerHTML = `Room Code: ${id}`;
});

    // Join Room
btnJoin.addEventListener("click", () =>{
    // Falta validacion front
    let code = document.getElementById("roomCode").value;
    socket.emit("room:join", code);
});

    // Join Room Confirmation
socket.on("room:join:confirmation", message => {
    window.alert(message);
    // roomContainer.style.display = "none";
    // gameContainer.style.display = "block";
});

// Game