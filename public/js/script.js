let btnPiedra = document.getElementById("piedra");
let btnPapel = document.getElementById("papel");
let btnTijeras = document.getElementById("tijeras");
let txtEspera = document.getElementById("wait");

btnPiedra.addEventListener("click", () =>{
    enviar("piedra");
});

btnPapel.addEventListener("click", () =>{
    enviar("papel");
});

btnTijeras.addEventListener("click", () =>{
    enviar("tijeras");
});

socket.on("juego:recibir", (data) => {recibir(data)});

function enviar(x){
    socket.emit("juego:enviar", x);
    btnPapel.style.display = "none";
    btnPiedra.style.display = "none";
    btnTijeras.style.display = "none";
    txtEspera.style.display = "inline";
}

function recibir(data){
    window.alert(data);
    btnPapel.style.display = "inline";
    btnPiedra.style.display = "inline";
    btnTijeras.style.display = "inline";
    txtEspera.style.display = "none";
}
