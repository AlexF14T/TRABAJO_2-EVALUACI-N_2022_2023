'use-strict';


/*
Esta funcion es la que se crea cuando ejecutamos el html,
contiene la creacion del html del login y del registro y luego
llamara a la funcion listener
*/
function inicio(){

    login();

    function login(){

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

    function registro(){

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

        var button = document.createElement("button");
        button.textContent="Registrarse";
        button.classList.add("submit");

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
            evento.preventDefault();
    
            if(evento.target.value == "login"){
                
                document.getElementById("login").remove();
                registro();
            }
            if(evento.target.value == "registro"){

                document.getElementById("registro").remove();
                login();
            }
        });
    } 
    
}

window.onload = inicio;

export{inicio,};