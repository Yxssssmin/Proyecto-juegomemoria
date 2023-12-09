export { Menu };

import '../assets/scss/menu.css';
import Icon from '../assets/img/logo.png';

class Menu {
  constructor() {}

  generateMenu() {
    let imagen = new Image();
    imagen.src = Icon;

    let menuTemplate = document.querySelector("#principal");
    menuTemplate.innerHTML = `  

    <header>

      <a href="#/home" class="logo">
        <img src="${imagen.src}" height="60px" width="75px">
      </a>

      <ul class="navbar">
        <li><a href="#/home">Inicio</a></li>
        <li><a href="#/game">Juego carta de memoria</a></li>
        <li><a href="#">Conecta 4</a></li>
        <li><a href="#/profile">Perfil</a></li>

      </ul>

      <div class="h-right">
        <a href="#/perfil"><i class="ri-user-fill"></i></a>
        <a id="logout" href="#"><i class="ri-logout-box-r-fill"></i></a>
        <a href="#"><i class="bx bx-menu" id="menu-icon"></i></a>
      </div>

      

    </header>


    <div id="contenido"></div>

</body>

  
  `;

  document.querySelector("#logout").addEventListener("click", logout);
  }
}
