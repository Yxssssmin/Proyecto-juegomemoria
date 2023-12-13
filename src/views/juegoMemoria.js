export { Game };

import "../assets/scss/game.css";
import Imagen1 from "../assets/img/img-1.png";
import Imagen2 from "../assets/img/img-2.png";
import Imagen3 from "../assets/img/img-3.png";
import Imagen4 from "../assets/img/img-4.png";
import Imagen5 from "../assets/img/img-5.png";
import Imagen6 from "../assets/img/img-6.png";
import Imagen7 from "../assets/img/img-7.png";
import Imagen8 from "../assets/img/img-8.png";



class Game {
  constructor() {}

  generateGame() {
    const game = document.querySelector("#principal");
    const numCartas = 8; // El número de parejas de cartas
    const imagenes = [Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6, Imagen7, Imagen8];
    
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards');

    // para que no me quede sucio y no repetir codigo en el html
    // hago un bucle de 8 cartas con sus respectivos elementos
    for (let i = 0; i < numCartas * 2; i++) {
      const li = document.createElement('li');
      li.classList.add('card');

      const frontView = document.createElement('div');
      frontView.classList.add('view', 'front-view');
      const questionMarkIcon = document.createElement('span');
      questionMarkIcon.classList.add('material-icons');
      questionMarkIcon.textContent = 'question_mark';
      frontView.appendChild(questionMarkIcon);

      const backView = document.createElement('div');
      backView.classList.add('view', 'back-view');
      const img = document.createElement('img');
      img.src = imagenes[i % numCartas].src; // Usamos el operador módulo para asegurarnos de que las imágenes se repitan
      backView.appendChild(img);

      li.appendChild(frontView);
      li.appendChild(backView);
      cardsContainer.appendChild(li);
    }

    game.innerHTML = `
      <div class="container">
        <h2> 
          Parejas: <span>0</span> de <span id="intentos">0</span> intentos
        </h2>
        ${cardsContainer.outerHTML}
      </div>`;


    const cards = document.querySelectorAll(".card");
    const num_parejas = document.querySelector(".container h2 span");

    let tar_1, tar_2;
    let deshabilitarCartas = false;
    let parejas = 0;
    let intentos = 0;

    let span_intentos = document.querySelector("#intentos");

    const sonIguales = (image1, image2) => {
      intentos++;
      span_intentos.innerHTML = intentos;
      if(image1 == image2) {
        parejas++;
        num_parejas.innerHTML = parejas;

        if(parejas == 8) {
          setTimeout(() => {
            return reiniciarJuego();

          }, 1000)
        }
        tar_1.removeEventListener('click', darVuelta);
        tar_2.removeEventListener('click', darVuelta);
        tar_1 = tar_2 = "";
        
        return deshabilitarCartas = false;

      }

      setTimeout(() => {
        tar_1.classList.add('moverse');
        tar_2.classList.add('moverse');
      }, 500)

      setTimeout(() => {
        tar_1.classList.remove('moverse', 'vuelta');
        tar_2.classList.remove('moverse', 'vuelta');
        tar_1 = tar_2 = "";
        deshabilitarCartas = false;
      }, 1500)

    }

    const darVuelta = (e) => {
        let tarjeta = e.target;
        if(tarjeta != tar_1 && !deshabilitarCartas) { // si la tarjeta que he seleccionado es distinto de tarjeta 1 y no están deshabilitados 
          tarjeta.classList.add('vuelta'); // entonces le doy la vuelta

          if(!tar_1 ) { //si la primera tarjeta está vacia
            return tar_1 = tarjeta;  
          }
  
          tar_2 = tarjeta;
          deshabilitarCartas = true;
          let imagen1 = tar_1.querySelector('img').src;
          let imagen2 = tar_2.querySelector('img').src;
          sonIguales(imagen1, imagen2);

        }
        
    }

    const reiniciarJuego = () => {
      parejas = 0;
      tar_1 = tar_2 = "";
      deshabilitarCartas = false;
      num_parejas.innerHTML = parejas;

      let fichas = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
      fichas.sort(() => {
          return Math.random() - 0.5;
      });

      cards.forEach((tarjeta, index) => {
        tarjeta.classList.remove('vuelta');

        // PREGUNTAR PROFESOR IMAGENES
        let imgEtiqueta = tarjeta.querySelector('img');
     
        //imgEtiqueta.src = `./src/assets/img/img-${fichas[index]}.png`;
        imgEtiqueta.src = imagenes[fichas[index]];
        tarjeta.addEventListener('click', darVuelta);

      });
    }
    
    reiniciarJuego();
    cards.forEach(tarjeta => {
      //tarjeta.classList.add('vuelta');
      tarjeta.addEventListener('click', darVuelta)
    });

  }
}
