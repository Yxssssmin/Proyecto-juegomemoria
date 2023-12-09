export { router };

import { Login } from "../views/formLogin";
import { Menu } from "../views/menu";
import { Game } from "../views/juegoMemoria";
import { Home } from "../views/home";

const router = (route) => {

    switch (route) {
        case "#/menu":
            let menu = new Menu();
            menu.generateMenu();
            break;
        case "#/login":
            console.log("login");
            let login = new Login();
            login.generateLogin();
            break;
        case "#/game":
            let game = new Game();
            game.generateGame();
            break;
        case "#/home":
            let home = new Home();
            home.generateHome();
            break;
        case "#/register":
            let register = new Login();
            register.generateRegister();
            
    }
}