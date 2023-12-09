export { Login };

let access_token = ";";

import { router } from "../router/router";
import '../assets/scss/login.css';

import { validarForm } from "../utils/validarLogin";
import { loginUser, registerUser } from "../services/users";

class Login {

  generateLogin() {
    let login = document.querySelector("#principal");
    login.innerHTML = `
    
    <div class="wrapper">

        <!--            FORM LOGIN               -->

        <div class = "form-box login">
            <h2>Login</h2>
            <p id="loginError"></p>
            <form action="" method="post" >
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="mail"></ion-icon>
                    </span>
                    <input type="text" id="inputLogin" required>
                    <label>Email</label>
                </div>

                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input type="password" id="inputPassword" required>
                    <label>Password</label>
                </div>

                <button type="button" id="botonLogin">Login</button>
                <div class="login-register">
                    <p>Don't have an account? 
                        <a href="#/register" class="register-link">Register</a>
                    </p>
                </div>
                
                <div id="olvido">
            
                </div>
            </form>
        </div>

    </div>

     
    `;

    /*const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
  
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });
  
    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    }); */

    login.querySelector("#botonLogin").addEventListener("click", async () => {
        let email = login.querySelector("#inputLogin").value;
        let password = login.querySelector("#inputPassword").value;
        
        if (validarForm(email, password)) {
            await loginUser(email, password).then(status => {
                if(status.success === true) {
                    alert("Sesion Iniciada!");
                    window.location.hash = "#/home";
                } else {
                    
                    alert("Usuario o contraseña incorrectos!");
                    let olvidoPass = document.createElement("a");
                    olvidoPass.classList.add('custom-alert');
    
                    //agregar contenido al alert
                    olvidoPass.innerHTML = "¿Has olvidado tu contraseña?";
                    olvidoPass.href = "#/olvidoPass";
                    login.append(olvidoPass);
                }
            });
        
        } else {
            login.querySelector('#loginError').innerHTML =  "Nickname o email y contraseña deben de estar introducidos";
        }
    
    });


  
  }
    
    generateRegister() {
        let register = document.querySelector('#principal');
        register.innerHTML = `
        <!--            FORM REGISTER                -->
        
        <div class="wrapper active">

        <div class = "form-box register">
        <h2>Registro</h2>
        <p id="registerError"></p>
        <form action="" method="post" >
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="person"></ion-icon>
                    </span>
                    <input type="text" id="username" required>
                    <label>Username</label>
                </div>

                <div class="input-box">
                <span class="icon">
                        <ion-icon name="mail"></ion-icon>
                    </span>
                    <input type="email" id="signupemail" required>
                    <label>Email</label>
                </div>

                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input type="password" id="signuppassword" required>
                    <label>Password</label>
                </div>
                <button type="button" id="botonRegistro">Registro</button>
                <div class="login-register">
                    <p>Already have an account? 
                        <a href="#/login" class="login-link">Login</a>
                    </p>
                </div>
            </form>
        </div><br>

        </div>
    
    `;


    
    register.querySelector('#botonRegistro').addEventListener('click', async() => {
        let email = register.querySelector("#signupemail").value;
        let password = register.querySelector("#signuppassword").value; 
        let username = register.querySelector('#username').value;

        if(validarForm(email,password)) {

            await registerUser(email,password).then((status) => {
                if (status.success === true) {
                    alert("¡Usuario creado!");
                    window.location.reload();
                    
                    
                } else {
                    register.querySelector('#registerError').innerHTML = status.errorText;
                    
                }
            });
        } else {
            register.querySelector('#registerError').innerHTML =  "Nickname o email y contraseña deben de estar introducidos";
        }
    });
        
}

}

    
