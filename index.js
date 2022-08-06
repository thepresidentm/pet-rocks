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

// // Rooms
// let rooms = [];

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
        let id = genId();
        // let newRoom = {};
        // newRoom.id = id;
        // newRoom.users = [ socket.id ];
        // rooms.push(newRoom);
        leavePastRooms(socket);
        socket.join(id);
        io.to(socket.id).emit("room:id", id);
    });

    // socket.on("disconnect", () => {
    //     console.log(getUserRooms(socket.id));
    // });
});

function getAllRooms(){
    let rooms = [];
    // Aunque no se use el element si lo borras no jala xd
    io.sockets.adapter.rooms.forEach((element, index) => {
        rooms.push(index);
    });
    return rooms;
}

function getUserRooms(socket){
    let rooms = [];
    socket.rooms.forEach(element => {
        if(element.length == 6){
            rooms.push(element);
        }
    });
    return rooms;
}

function leavePastRooms(socket){
    let userRooms = getUserRooms(socket);
    if(userRooms.length != 0){
        userRooms.forEach(element =>{
            socket.leave(element);
        });
    }
}

function genId(){
    let rooms = getAllRooms();
    let string = Math.random().toString(16).substring(2, 8);
    let found = rooms.find(element => element.id == string );
    return found == undefined ? string : genId();
}

// function getUserRooms(user){
//     // Returns index from rooms array
//     let found = [];
//     rooms.map((element, index) => {
//         for(let i = 0; i < element.users.length; i++){
//             if(element.users[i] == user){
//                 found.push(index);
//             }
//         }
//     });
//     return found;
// }

// function removeUser(socket, roomIndex){
    
// }