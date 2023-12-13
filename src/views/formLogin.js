export { Login };

let access_token = ";";

import { router } from "../router/router";
import '../assets/scss/login.css';

import { validarForm, validarLogin } from "../utils/validarLogin";
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
            <form>
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

                <button type="submit" id="botonLogin">Login</button>
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
        
        if (validarLogin(email, password)) {
            await loginUser(email, password).then(status => {
                if(status.success === true) {
                    alert("Sesion Iniciada!");
                    window.location.hash = "#/profile";
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
        <form>

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
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input type="password" id="signuppassword2" required>
                    <label>Repeat password: </label>
                </div>
                <button type="submit" id="botonRegistro">Registro</button>
                <div class="login-register">
                    <p>Already have an account? 
                        <a href="#/login" class="login-link">Login</a>
                    </p>
                </div>
            </form>
        </div><br>

        </div>
    
    `;

    register.querySelector('#botonRegistro').addEventListener('click', async(event) => {
        event.preventDefault();
        let email = register.querySelector("#signupemail").value;
        let password = register.querySelector("#signuppassword").value; 
        let password2 = register.querySelector("#signuppassword2").value;

        if (email === "" || password === "" || password2 === "") {
            register.querySelector('#registerError').innerHTML =  "Debes introducir datos.";
        } else if (password !== password2 || password.length < 8 || password2.length < 8) {
            register.querySelector('#registerError').innerHTML =  "Las contraseñas deben ser iguales y tener al menos 8 caracteres.";
        } else if (!email.includes("@") || !email.includes(".")) {
            register.querySelector('#registerError').innerHTML =  "La dirección de correo electrónico no es válida.";
            return false; 
        }



            await registerUser(email,password).then((status) => {
                if (status.success === true) {
                    alert("¡Usuario creado!");
                    window.location.hash = "#/login";
                    
                } else {
                    register.querySelector('#registerError').innerHTML = status.errorText;
                    
                }
            });

    });
        
}

}

    
