// Animation
let roomContainer = document.getElementById("container-room");
let gameContainer = document.getElementById("container-game");

function changeToGame(){
    roomContainer.style.display = "none";
    gameContainer.style.display = "block";
}

function changeToRoom(){
    roomContainer.style.display = "block";
    gameContainer.style.display = "none";
    containerId.innerHTML = "";
}

// Rooms
let btnJoin = document.getElementById("join");
let btnCreate = document.getElementById("create");
let btnLeave = document.getElementById("leave");
let containerId = document.getElementById("container-id");
let room;
const regex = /^[a-z0-9]{6}$/;
    // Create Room
btnCreate.addEventListener("click", () =>{
    socket.emit("room:create");
});

    // Receive Room Id
socket.on("room:id", (code) => {
    room = code;
    containerId.innerHTML = `Room Code: ${code}`;
    changeToGame();
});

    // Join Room
btnJoin.addEventListener("click", () =>{
    let code = document.getElementById("roomCode").value;
    if(regex.test(code)){
        room = code;
        socket.emit("room:join", code);
    }else{
        window.alert("The code isn't valid");
    } 
});

    // Join Room Confirmation
socket.on("room:join:confirmation", message => {
    window.alert(message);
    if(message == "success"){
        changeToGame();
    }
    
});

    // Leave Room
btnLeave.addEventListener("click", () =>{
    socket.emit("room:leave", room);
    changeToRoom();
});

// Game