const express = require("express");
const socketIo = require("socket.io");

// Config server
const app = express();
const port = process.env.PORT || "5000";
app.use(express.static('./public'));

const server = app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


app.get("/", (req, res) => {
    res.sendFile("index.html");
});

const io = socketIo(server);

// Rooms
let rooms = [];

io.on('connection', socket => {
    // socket.on('juego:enviar', (data) =>{
    //     socket.broadcast.emit('juego:recibir',
    //         data == "piedra" ||
    //         data == "papel" ||
    //         data == "tijeras" ?
    //         data : "corrupto"
    //     );
    // });

    socket.on("room:create", () => {
        // Falta validar que no este en varias salas o algo asi
        // Falta el join
        let id = genId();
        let newRoom = {};
        newRoom.id = id;
        newRoom.users = [ socket.id ];
        rooms.push(newRoom);
        console.log(newRoom);
        io.to(socket.id).emit("room:id", id);
    })
});

function genId(){
    let string = Math.random().toString(16).substring(2, 8);
    let found = rooms.find(element => element.id == string );
    return found == undefined ? string : genId();
}