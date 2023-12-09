import { Menu } from "./views/menu.js";
import { Login } from './views/formLogin';
import { router } from './router/router';


(()=>{ 

    document.addEventListener("DOMContentLoaded", function () {
      let main = document.querySelector("#principal");
      let menu = new Menu();
      main.append(menu.generateMenu());

      window.location.hash = '#/login';
      router(window.location.hash);
  
    });

    window.addEventListener("hashchange", () => {
      router(window.location.hash);
    });
})();