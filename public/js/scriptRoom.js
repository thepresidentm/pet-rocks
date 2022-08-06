let btnNewRoom = document.getElementById("newRoom");
let contenedor = document.getElementById("contenedor");

btnNewRoom.addEventListener("click", () =>{
    socket.emit("room:create");
});

// Listeners sockets

socket.on("room:id", (id) => {
    contenedor.innerHTML = id;
});

