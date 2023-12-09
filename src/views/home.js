export { Home };

import "../assets/scss/home.css";

class Home {

    constructor() {}

    generateHome() {
        let home = document.querySelector("#contenido");
        home.innerHTML = `
        <div class="bienvenida">
            <span class="text1">Welcome</span>
            <span class="text2">Yasmin</span>
        </div>
        `;
    }
}