export { Game };

import "../assets/scss/game.css";
import Imagen1 from "../assets/img/img-1.png";
import Imagen2 from "../assets/img/img-2.png";
import Imagen3 from "../assets/img/img-3.png";
import Imagen4 from "../assets/img/img-4.png";

class Game {
  constructor() {}

  generateGame() {
    let img1 = new Image();
    img1.src = Imagen1;
    let img2 = new Image();
    img2.src = Imagen2;
    let img3 = new Image();
    img3.src = Imagen3;
    let img4 = new Image();
    img4.src = Imagen4;

    let game = document.querySelector("#contenido");
    game.innerHTML = `
      <div class="container">
      <div class="cards">
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="${img1.src}">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="${img2.src}">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="${img3.src}">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="${img4.src}">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="img/img-5.png">
          </div>
        </li> 
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="img/img-6.png">
          </div>
        </li> 
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="img/img-7.png">
          </div>
        </li> 
        <li class="card">
          <div class="view front-view">
            <span class="material-icons">
              question_mark
            </span>
          </div>
          <div class="view back-view">
            <img src="img/img-8.png">
          </div>
        </li>
        <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="${img1.src}">
        </div>
      </li>
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="${img2.src}">
        </div>
      </li>
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="${img3.src}">
        </div>
      </li>
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="${img4.src}">
        </div>
      </li>
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="img/img-5.png">
        </div>
      </li> 
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="img/img-6.png">
        </div>
      </li> 
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="img/img-7.png">
        </div>
      </li> 
      <li class="card">
        <div class="view front-view">
          <span class="material-icons">
            question_mark
          </span>
        </div>
        <div class="view back-view">
          <img src="img/img-8.png">
        </div>
      </li>
      </div>
    </div>

    `;

  }
}
