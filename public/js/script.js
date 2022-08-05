let btnPiedra = document.getElementById("piedra");
let btnPapel = document.getElementById("papel");
let btnTijeras = document.getElementById("tijeras");

let espera = new Promise((resolve, reject) => {
})

btnPiedra.addEventListener("click", () =>{
    espera = enviar("piedra");
});


btnPapel.addEventListener("click", () =>{
    espera = enviar("papel");
});


btnTijeras.addEventListener("click", () =>{
    espera = enviar("tijeras");
});

function enviar(x){
    socket.emit("juego:enviar", x);
    return new Promise();
}

espera.then(()=>{
    window.alert("resolucion");
});

socket.on('juego:recibir', (data) =>{
    espera.resolve(data);
});