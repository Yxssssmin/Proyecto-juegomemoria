export { router };

import { Login } from "../views/formLogin";
import { Menu } from "../views/menu";
import { Game } from "../views/juegoMemoria";
import { Home } from "../views/home";
import { isLogged, logout } from "../services/users";
import { olvidoPass } from "../views/olvidoPass";
import { Profile } from "../views/profile";

const router = (route) => {

    let main = document.querySelector('#principal');
    let menu = document.querySelector('#menu');

    const toggleMenuVisibility = (visible) => {
        menu.style.display = visible ? 'block' : 'none';
    };

    switch (route) {

        case '#/':
            if (isLogged()) {
                main.innerHTML = "";
                let home = new Home();
                home.generateHome();  // Puedes pasar el nombre de usuario si es necesario
                toggleMenuVisibility(true);
            } else {
                window.location.hash = "#/login";
                toggleMenuVisibility(false);
            }
            break;

        case "#/login":
            if(!isLogged()) {  // Si esta loggeado no se podra acceder al login
                main.innerHTML = "";
                let login = new Login();
                login.generateLogin();
                toggleMenuVisibility(false);
            } else {
                window.location.hash = "#/";
            }
            break;
        
        case "#/home":
            main.innerHTML = "";
            let home = new Home();
                home.generateHome();
            break;

        case "#/register":
            main.innerHTML = "";
            let register = new Login();
            register.generateRegister();
            toggleMenuVisibility(false);
            break;

        case "#/game":
            main.innerHTML = "";
            let game = new Game();
            game.generateGame();
            toggleMenuVisibility(isLogged());
            break;

        case "#/logout":
            logout();
            window.location.hash = '#/';
            break;

        case '#/profile':
            if (isLogged()) { // Si no esta loggeado no se podra acceder a perfil
                main.innerHTML = '';
                let profile = new Profile();
                profile.generateProfile();
                toggleMenuVisibility(true);
            } else {
                window.location.hash = "#/";
            } 
            break;
        
        case '#/olvidoPass':
            main.innerHTML = "";
            olvidoPass();
            toggleMenuVisibility(isLogged());
            break;

        case '':
            window.location.hash = '#/';
            toggleMenuVisibility(isLogged());
            break;
        
        case '/':
            main.innerHTML = "";
            window.location.hash = "#/";
            toggleMenuVisibility(isLogged());
            break;
    }
            
}
