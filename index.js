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

io.on('connection', (socket) =>{
    socket.on('juego:enviar', (data) =>{
        socket.broadcast.emit('juego:recibir',
            data == "piedra" ||
            data == "papel" ||
            data == "tijeras" ?
            data : "corrupto"
        );
    });
});