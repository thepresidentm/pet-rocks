let btnPiedra = document.getElementById("piedra");
let btnPapel = document.getElementById("papel");
let btnTijeras = document.getElementById("tijeras");
let txtEspera = document.getElementById("wait");

let turno = 0;
let eleccion = "piedra";

// Falta corregir que se esperen para llegar al resultado

btnPiedra.addEventListener("click", () =>{
    enviar("piedra");
});

btnPapel.addEventListener("click", () =>{
    enviar("papel");
});

btnTijeras.addEventListener("click", () =>{
    enviar("tijeras");
});

socket.on("juego:recibir", (data) => {
    if(turno != 0){recibir(data)}
});

function enviar(x){
    turno = 1;
    socket.emit("juego:enviar", x);
    eleccion = x;
    btnPapel.style.display = "none";
    btnPiedra.style.display = "none";
    btnTijeras.style.display = "none";
    txtEspera.style.display = "inline";
}

function recibir(data){
    let victoria = 1;
    // 0 = derrota
    // 1 = victoria
    // 2 = empate
    if(data != "corrupto"){
        if(eleccion == "piedra"){
            victoria =
            data == "papel" ? 0 :
            data == "tijeras" ? 1 :
            2
        }
        else if(eleccion == "papel"){
            victoria =
            data == "tijeras" ? 0 :
            data == "piedra" ? 1 :
            2
        }
        else if(eleccion == "tijeras"){
            victoria =
            data == "piedra" ? 0 :
            data == "papel" ? 1 :
            2
        }
    }
    window.alert(
        victoria == 0 ? "Has perdido" :
        victoria == 1 ? "Has ganado" :
        "Has empatado"
    );
    btnPapel.style.display = "inline";
    btnPiedra.style.display = "inline";
    btnTijeras.style.display = "inline";
    txtEspera.style.display = "none";
}
