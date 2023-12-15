export { Home };

import "../assets/scss/home.css";
import { getProfile } from "../services/users";

class Home {

    constructor() {}

    generateHome() {
        let home = document.querySelector("#principal");

        getProfile().then((dataProfile) => {
            if (dataProfile && dataProfile.length > 0) {
              dataProfile = dataProfile[0];
              console.log(dataProfile);
            } else {
              console.error(
                "No se encontraron datos del perfil o el perfil está vacío."
              );
              dataProfile = {}; // Establecer un objeto vacío para evitar problemas con la desestructuración
            }
            
            home.innerHTML = `
            <div class="bienvenida">
            <span class="text1">Welcome</span>
            <span class="text2">${dataProfile.username}</span>
            </div>
            `;
        });
        }
}