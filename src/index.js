import { Menu } from "./views/menu.js";
import { router } from './router/router';


(()=>{ 

    document.addEventListener("DOMContentLoaded", function () {
      let main = document.querySelector("#menu");
      let menu = new Menu();
      main.append(menu.generateMenu());

      router(window.location.hash);
  
      window.addEventListener("hashchange", () => {
        router(window.location.hash);
      });
    });

})();