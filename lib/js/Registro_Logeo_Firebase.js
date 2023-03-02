'use strict';
/*
Esta funcion es la que se crea cuando ejecutamos el html,
contiene la creacion del html del login y del registro y luego
llamara a la funcion listener
*/

/*import que se necesita para inicializar firebase, la autentificacion el databse */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getFirestore, addDoc, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"; //Añadir datos a la base de datos llamada fire store   //Base de datos

/*import del juego */
import { juego } from "./Juego.js";


/*Configuracion del proyecto de firebase */
const firebaseConfig = {
    apiKey: "AIzaSyB_a6VQZ-wPvoDAG_SuPymlK5Q5_H1qFy0",
    authDomain: "juegoalex-d46f5.firebaseapp.com",
    projectId: "juegoalex-d46f5",
    storageBucket: "juegoalex-d46f5.appspot.com",
    messagingSenderId: "159416343759",
    appId: "1:159416343759:web:3a6d52012afb1780d82bba",
    measurementId: "G-XVY4XX05VW"
};

/*Inicializar firebase y la base de datos */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



/*
funcion que comprobara el logeo del usuario,
recogera los datos del html y hara una consulta firebase
si el login es correcto eliminara el login y llamara a la 
funcion juego. 
Si el login es incorrecto mostrara un error
 */
function login() {

    var email = document.getElementById("email").value;
    var password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth,email, password)

    .then(function(user) {

        alert("Usuario logeado correctamente: ", user)

        document.getElementById("login").remove();
        
        sessionStorage.setItem("usuario", email);
        juego();
    })
    .catch(function(error) {

        alert("El email o la contraseña no coincide")
        // Mostrar mensaje de error
    });
}


/*
funcion que comprobara el registro del usuario,
recogera los datos del html y hara una consulta firebase
si el registro es correcto mostrara que el registro es correcto,
Si el registro es incorrecto mostrara un error
 */
function registro() {

    var email = document.getElementById("email").value;;
    var password = document.getElementById('password').value;
    const auth = getAuth();

    createUserWithEmailAndPassword(auth,email, password)

    .then(function(user) {

        alert("Usuario registrado correctamente");
    })
    .catch(function(error) {

        alert("Este email ya esta registrado");
    });
}

/*
Esta funcion es la que se crea cuando ejecutamos el html,
contiene la creacion del html del login y del registro y luego
llamara a la funcion listener
*/
function logearse(){

    var form = document.createElement("form");
    form.classList.add("box");
    form.id="login";

    var h1 = document.createElement("h1");
    h1.textContent="Login";

    var email = document.createElement("input");
    email.type="text";
    email.id="email";
    email.placeholder="Email";

    var contraseña = document.createElement("input");
    contraseña.type="password";
    contraseña.id="password";
    contraseña.placeholder="Contraseña";

    var button = document.createElement("input");
    button.type="submit"
    button.textContent="Login";
    button.classList.add("submit");
    button.value="login";

    var a = document.createElement("a");
    a.classList.add("login");


    var h5 = document.createElement("h5");
    h5.textContent= "¿No te has registrado aún?";
    h5.value="login";
    a.appendChild(h5);

    form.appendChild(h1);
    form.appendChild(email);
    form.appendChild(contraseña);
    form.appendChild(button);
    form.appendChild(a);

    document.body.appendChild(form);

    eventlistener();
}

function registrarse(){

    var form = document.createElement("form");
    form.classList.add("box");
    form.id="registro";

    var h1 = document.createElement("h1");
    h1.textContent="Registro";

    var email = document.createElement("input");
    email.type="text";
    email.id="email";
    email.placeholder="Email";

    var contraseña = document.createElement("input");
    contraseña.type="password";
    contraseña.id="password";
    contraseña.placeholder="Contraseña";

    var button = document.createElement("input");
    button.type="submit";
    button.textContent="Registrarse";
    button.classList.add("submit");
    button.value="registro";
    var a = document.createElement("a");
    a.classList.add("register");
    a.value="registro";

    var h5 = document.createElement("h5");
    h5.textContent= "Volver a Login";
    h5.value="registro";

    a.appendChild(h5);

    form.appendChild(h1);
    form.appendChild(email);
    form.appendChild(contraseña);
    form.appendChild(button);
    form.appendChild(a);

    document.body.appendChild(form);
    
    eventlistener();
}

/*
Esta funcion contiene todos los listener que necesita para
desplazarse entre el login y el registro
*/
function eventlistener(){

    document.getElementsByTagName("h5")[0].addEventListener("click", (evento)=>{

        console.log(evento.target.value);
        var enlace = document.getElementsByTagName("h5")[0];

        if(evento.target.value == "login"){

            document.getElementById("login").remove();
            registrarse();
        }
        if(evento.target.value == "registro"){

            document.getElementById("registro").remove();
            logearse();
            }
    });

    document.getElementsByClassName("submit")[0].addEventListener("click",(e)=>{
        e.preventDefault();

        if(e.target.value== "login"){

            login();
        }
        if(e.target.value== "registro"){

            registro();
        }

    });
}


/*
    Esta funcion lo que hara sera conectarse a la base de datos
    para comprobar si el usuario ha hecho un record o no.
    Recogemos el valor de sesion del nombre del usuario e iniciaremos
    una consulta
 */
async function record(tiradas, movimientos, fechaI, fechaF)
{

    let usuario = sessionStorage.getItem("usuario");


    const consulta = await getDocs(collection(db, "usuarios"));
    let encontrado = false;

    /*
    Comprobamos la consulta, si esta el usuario comprobara si ha hecho record, informara al usuario
    de que ha hecho record, y luego actualizara la base de datos con el record y sus fechas.
    Si no hay record, mostrara un mensaje con el record que tiene.

    Si no ecncuentra el usuario en la base de datos llamara a la funcion guardardatospartida
     */
    consulta.forEach((result) =>
    {

        if(result.data().usuario == usuario && encontrado == false)
        {

            if(result.data().recordTiradas > tiradas)
            {

                alert("Héroe, has establecido un récord de tiradas con "+tiradas+" tiradas");

                let actu = doc(db, "usuarios", result.id);

                updateDoc(actu,     
                {
                    
                    recordTiradas: tiradas,
                    movimientos: movimientos,
                    fechaI: fechaI,
                    fechaF: fechaF 
                
                });
                
            }
            else    //Sino
            {

                alert("Récord no superado, el actual récord es "+result.data().recordTiradas);

            }

            encontrado = true;

        }   
    
    });

    if(encontrado == false)
    {

        guardarDatosPartida(tiradas, movimientos, fechaI, fechaF);

    }

}


/*
Esta funcion lo que hara sera añadir datos a la base de datos, recogera el valor de sesion
del nombre del usuario e insertara todos los valores en la base de datos
*/
function guardarDatosPartida(tiradas, movimientos, fechaI, fechaF)
{
    let usuario = sessionStorage.getItem("usuario"); 

    try 
    {
        alert("Has establecido un récord de tiradas con "+tiradas+" tiradas"); 
        addDoc(collection(db, "usuarios"),  //Añadimos los valores a la base de datos
        {

            usuario: usuario,
            fechaI: fechaI,
            fechaF: fechaF,
            recordTiradas: tiradas,
            movimientos: movimientos
        
        });
    } 
    catch (err)
    {     
        console.error("Error añadiendo los datos: ", err);   
    }
}

/*Esta es la funcion que se ejecutara cuando se cargue el index */
function inicio(){

    logearse();


}

window.onload=inicio;

export{logearse, record,}