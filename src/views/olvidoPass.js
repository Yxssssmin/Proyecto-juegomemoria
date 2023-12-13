export { olvidoPass };

import { forgotPassword } from "../services/users.js";
import '../assets/scss/login.css';

function olvidoPass() {
    let contenido = document.createElement("div");
    contenido.classList.add("formOlvidoPass");
    contenido.append(form());
    let container = document.querySelector('#principal');
    container.append(contenido);
}

function form() {
    let formOlvidoPass = document.createElement("form");

    let submit = document.createElement("input");
    submit.id = "botonrecu";
    submit.value = "Recuperar contraseña";
    submit.type = "submit";

    let formOlvidoPassHtml = `
    <div class="wrapper2">
    <div class = "form-box login">
        <div class="input-box">
            <span class="icon">
                <ion-icon name="mail"></ion-icon>
            </span>
            <input type="text" name="user" id="user-olvidoPass">
            <label for="user-olvidoPass">Email:</label>
        </div>
        </div>
        </div>
    `;

    formOlvidoPass.innerHTML = formOlvidoPassHtml;
    formOlvidoPass.append(submit);

    submit.addEventListener("click", async (e) => {
        e.preventDefault();

        let email = document.getElementById("user-olvidoPass").value;

        if (email == "") {
            alert("Rellena todos los campos!");
            return;
        }

        await forgotPassword(email);
    });

    return formOlvidoPass;
}