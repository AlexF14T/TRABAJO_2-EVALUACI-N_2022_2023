
/*
Esta funcion crea un div que contendra otros dos divs, uno para la tabla y otro para el dado,
 luego llamara a las funciones crear tabla y crear dado
*/
function CrearContenido(){

    let divprincipal = document.createElement("div");
    divprincipal.id = "divprincipal"
    document.body.appendChild(divprincipal);

    let divtabla = document.createElement("div");
    divtabla.id = "divtabla";
    
    
    let div = document.createElement("div");
    div.id="boton";

    divprincipal.appendChild(divtabla);
    divprincipal.appendChild(div);  

    CrearTabla();
    CrearDado();

}
/*
Esta funcion crea la tabla del juego, con un numero de filas y columnas determinado
y sus respectivas IDs y clases luego inserta la tabla en el divtabla
*/
function CrearTabla(){
    
    let filas = 10;
    let columnas = 10;

    let tabla = document.createElement("table");

    for(let ctr = 0; ctr < filas ; ctr++){

        let tr = document.createElement("tr");
        tr.className = "tr";
        tr.id = "tr" + ctr;

        for(let ctd = 0; ctd < columnas ; ctd++){

            let td = document.createElement("td");
            td.className = "td";
            td.id = "td" + ctr+"-"+ctd;

            if(ctd == columnas-1 && ctr == filas-1){

                td.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
                td.setAttribute("verde","final");    
                td.className="cofre";        
            }

            if(ctd == 0 && ctr == 0){

                td.setAttribute("verde","principio");
                let img = document.createElement("img");
                img.id="personaje";
                
                img.src = "./lib/img/personaje.gif";
                td.appendChild(img);
                
            }

            tr.appendChild(td);
        }

        tabla.appendChild(tr);
    }

    document.getElementById("divtabla").appendChild(tabla);
}


/*
Esta funcion sirve para crear el html del dado,
con sus divs, IDs, atributos y clases necesarias para poder 
aplicarle el estilo css, luego llamara a la funcion dibujar
*/
function CrearDado(){

    let dado = document.createElement("div");
    dado.id = "clickdado";

    let espacio3D = document.createElement("div");
    espacio3D.classList.add("espacio3D");
    dado.appendChild(espacio3D);

    let cubo3D = document.createElement("div");
    cubo3D.classList.add("cubo3D");
    cubo3D.id = "cubo1";
    espacio3D.appendChild(cubo3D);


    let base = document.createElement("div");
    base.classList.add("base");
    cubo3D.appendChild(base);

    for(let i = 1; i<7; i++){

        let aside = document.createElement("aside");
        aside.classList.add("cara");
        aside.classList.add("cara"+i);

        let canvas = document.createElement("canvas");
        canvas.classList.add("dado");
        canvas.id="dado"+i;
        canvas.setAttribute("width","300px");
        canvas.setAttribute("height","300px");
        aside.appendChild(canvas);

        cubo3D.appendChild(aside);
    }

    document.getElementById("boton").appendChild(dado);

    let cerrasesion = document.createElement("button");
    cerrasesion.textContent = "Cerrar Sesión";
    cerrasesion.classList.add("submit");
    cerrasesion.id = "cerrarsesion";
    document.getElementById("boton").appendChild(cerrasesion);

    dibujar();
}


/*Esta funcion se encarga de poner los numeros del dado a cada cara del dado*/
function dibujar(){

    console.log("dibujar");
    var canvas = document.getElementById('dado1');
    if (canvas.getContext){

        console.log(canvas);
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.5;
        var Y = canvas.height*0.5;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var canvas = document.getElementById('dado2');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.25;
        var Y = canvas.height/2;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height/2;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var canvas = document.getElementById('dado3');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.25;
        var Y = canvas.height*0.25;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.5;
        var Y = canvas.height/2;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var canvas = document.getElementById('dado4');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.25;
        var Y = canvas.height*0.25;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.25;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.25;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var canvas = document.getElementById('dado5');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.25;
        var Y = canvas.height*0.25;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.25;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.25;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.5;
        var Y = canvas.height*0.5;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    var canvas = document.getElementById('dado6');
    if (canvas.getContext){
        var ctx = canvas.getContext("2d");
        var X = canvas.width*0.25;
        var Y = canvas.height*0.25;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.25;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.25;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.75;
        var Y = canvas.height*0.75;
        var r = canvas.height/8;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.5;
        var Y = canvas.height*0.25;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        var X = canvas.width*0.5;
        var Y = canvas.height*0.75;
        var r = canvas.height*0.125;
        ctx.beginPath();
        ctx.arc(X, Y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}
export {CrearContenido, CrearTabla, CrearDado};