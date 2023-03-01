
/*Funcionalidad del juego*/

/*metodos importados*/
import {CrearContenido} from "./CrearContenido.js";
import {logearse, record} from "./Registro_Logeo_Firebase.js";



let tiempoInicio = new Date();   /*Con esta variable capturo la fecha de inicio de sesion*/
tiempoInicio = tiempoInicio.toLocaleString();

/*funcion que contiene todas las funciones de juego*/
function juego(){


    /*llamamos a la funcion crear contenido para crear todo el html de la pagina*/ 
    CrearContenido();

    /*este event listener captura el click del boton de cerrar sesion, lo que hara será borrar el juego y mandarte al login*/
    document.getElementById("cerrarsesion").addEventListener("click",(evento)=>{

        document.getElementById("divprincipal").remove();
        logearse();
    });


    /* 
    capturamos un evento a toda la tabla para asi poder detectar donde quiere el usuario mover el personaje
    si donde clica el estilo es rojo, llamara a la funcion mover personaje
    */ 
    let tabla = document.getElementsByTagName("table")[0];
    tabla.addEventListener("click",(evento)=>{

        if(evento.target.style.backgroundColor == "rgba(255, 0, 0, 0.5)"){

            MoverPersonaje(evento.target.id);
        }
    });

    /*Contadores*/
    var NumeroTiradas = 0;
    var PasosJugador = 0;

    /*permite pulsar el dado */
    var dado = true;


    /*
    este listener lo que hace es capturar el click cuando le das al dado
    si el dado esta en true lo primero que hara sera limpiar todas las casillas
    que tenga rojo, luego creara un numero aleatorio que se asignara al id del dado
    para mostrar el numero correcto en el dado, llamara a la animacion para mover el dado
    y luego llamrara a la funcion casillasdado
    */
    var dadoanterior=1;
    document.getElementById("clickdado").addEventListener("click",(evento)=>{

        if(dado == true){

            NumeroTiradas++;
            dado = false;

            let tabla = document.getElementsByTagName("table")[0];

            for(let i = 0; i < tabla.childElementCount;i++){

                for(let c = 0; c < tabla.childNodes[i].childElementCount; c++){

                    if(tabla.childNodes[i].childNodes[c].style.backgroundColor == "rgba(255, 0, 0, 0.5)"){
                        
                        tabla.childNodes[i].childNodes[c].style = "";
                    }
                }
            }

            var randomNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1);
        
            document.getElementById("cubo"+dadoanterior).id = "cubo"+randomNumber;
            dadoanterior = randomNumber;
        
            if(document.getElementById("cubo"+randomNumber).className=="cubo3D gira"){
        
                document.getElementById("cubo"+randomNumber).className="cubo3D gira1";
            }
            else{
        
                document.getElementById("cubo"+randomNumber).className="cubo3D gira";
            }
      
            setTimeout(function() {

                CasillasDado(randomNumber)
            }, 1000);
        }
      
});

/*
    Esta funcion lo que hace es pintar de color las casillas por las que puedes moverte,
    para ello necesita el numero aleatorio que se incluira en las IDs de los td
    para poder pintar de color rojo. Tambien utiliza booleanos para comprobar que
    hay casillas en rojo para poder desplazarse, si no hay casillas en rojo lo que hara
    es permitir que el dado pueda ser pulsado


*/
    function CasillasDado(Numero){

        let existe1 = false;
        let existe2 = false;
        let existe3 = false;
        let existe4 = false;

        let tabla = document.getElementsByTagName("table")[0];

        for(let i = 0; i < tabla.childElementCount;i++){

            for(let c = 0; c < tabla.childNodes[i].childElementCount; c++){


                 if(tabla.childNodes[i].childNodes[c].firstChild){


                    for(let a = 0; a < tabla.childElementCount;a++){

                        for(let b = 0; b < tabla.childNodes[a].childElementCount; b++){
                  
                            if(tabla.childNodes[a].childNodes[b].id == "td"+parseInt(i+Numero)+"-"+parseInt(c)){

                                tabla.childNodes[a].childNodes[b].style="background-color: rgba(255, 0, 0, 0.5)";
                                existe1 = true;
                            }

                            if(tabla.childNodes[a].childNodes[b].id == "td"+parseInt(i)+"-"+parseInt(c+Numero)){

                                tabla.childNodes[a].childNodes[b].style="background-color: rgba(255, 0, 0, 0.5)";
                                existe2 = true;
                            }

                            if(tabla.childNodes[a].childNodes[b].id == "td"+parseInt(i-Numero)+"-"+parseInt(c)){

                                tabla.childNodes[a].childNodes[b].style="background-color: rgba(255, 0, 0, 0.5)";
                                existe3 = true;
                            }

                            if(tabla.childNodes[a].childNodes[b].id == "td"+parseInt(i)+"-"+parseInt(c-Numero)){

                                tabla.childNodes[a].childNodes[b].style="background-color: rgba(255, 0, 0, 0.5)";
                                existe4 = true;
                            }
                        }  
                    }    
                    
                } 
            }   
        }

        if(existe1 == false && existe2 == false && existe3 == false && existe4 == false){

            alert("No puedes desplazarte, vuelve a pulsar el dado")
            dado = true;
        }
        else{

            PasosJugador++;
        }
    }

    /*
    Esta funcion se encarga de poder desplazar al personaje, para ello lo que hace es buscar si hay algun td
    con un hijo, si lo tiene significa que tiene el personaje, lo que hara es borrarlo y luego poner la imagen
    del personaje en el td que el usuario a pulsado, para ello la funcion necesitara el td pulsado.
    Luego hara una comprobacion de si ha pulsado un td con un hijo, si lo ha pulsado significa que ha llegado
    al cofre y llamara a esa funciom
    */
    function MoverPersonaje(td){

        let tabla = document.getElementsByTagName("table")[0];
        
               
        for(let a = 0; a < tabla.childElementCount;a++){


            for(let b = 0; b < tabla.childNodes[a].childElementCount; b++){

                console.log(tabla.childNodes[a].childNodes[b].id);

                if(tabla.childNodes[a].childNodes[b].firstChild){

                    tabla.childNodes[a].childNodes[b].removeChild(tabla.childNodes[a].childNodes[b].firstChild);
                    

                    var img = document.createElement("img");
                    img.id="personaje";
                    img.src = "./lib/img/personaje.gif";
                    document.getElementById(td).appendChild(img);

                    dado = true;
                   
                    continue;
                }
            }
            if(dado == true){

                continue;
            }
        }
        if(document.getElementById(td).firstChild){


            setTimeout(() => {
                AbrirCofre(td, NumeroTiradas,PasosJugador)
            }, "1")
        }
    }
}

            
/*
    La funcion abrircofre comprobara el td pulsado para saber si es el cofre,
    si lo es informara al usuario del numero de tiradas y de pasos que ha dado,
    recogera la fecha en la que ha acabado la partida y llamara a la funcion record
    borrara todo el contenido del html y volvera a llamar a la funcion juego,
    para empezar otra partida
*/
function AbrirCofre(td, NumeroTiradas, PasosJugador){

    if(document.getElementById(td).getAttribute("verde") == 'final'){

        
        alert("Has llegado a la tumba en "+NumeroTiradas+" tiradas");
        alert("Has dado "+PasosJugador+" pasos");
       
        let tiempoFin = new Date();   //Cogemos la fecha del mometo de ganar
        tiempoFin = tiempoFin.toLocaleString(); //Lo tranformamos a string

        record(NumeroTiradas, PasosJugador, tiempoInicio, tiempoFin);

        td = document.getElementsByTagName("table")[0].firstChild.firstChild;
        
        document.body.innerHTML="";
        
        juego();
    }        
}

export{juego,};