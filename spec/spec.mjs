import { Game } from "../src/views/juegoMemoria.js";

describe('Game Functions', function() {

    // Mocking the game container
    document.body.innerHTML = '<div id="principal"></div>';
  
    it('should reset the game correctly', function() {
      // Create a game instance
      const game = new Game();
  
      // Set up the initial state
      const initialState = `
        <div class="container">
          <h2> 
            Parejas: <span>0</span> de <span id="intentos">0</span> intentos
          </h2>
          <div class="cards">
            <!-- Mocking card elements -->
            <li class="card"><div class="view front-view"><span class="material-icons">question_mark</span></div><div class="view back-view"><img src="mock-image-1.png"></div></li>
            <li class="card"><div class="view front-view"><span class="material-icons">question_mark</span></div><div class="view back-view"><img src="mock-image-2.png"></div></li>
            <!-- Add more cards as needed -->
          </div>
        </div>
      `;
      document.querySelector('#principal').innerHTML = initialState;
  
      // Set up the spy for the darVuelta function
      const darVueltaSpy = spyOn(game, 'darVuelta');
  
      // Call the reiniciarJuego function
      game.reiniciarJuego();
  
      // Check if the game state is reset
      expect(game.parejas).toBe(0);
      expect(game.tar_1).toBeUndefined();
      expect(game.tar_2).toBeUndefined();
      expect(game.deshabilitarCartas).toBe(false);
  
      // Check if the num_parejas and intentos elements are reset
      const numParejasElement = document.querySelector('.container h2 span');
      const intentosElement = document.querySelector('#intentos');
      expect(numParejasElement.innerHTML).toBe('0');
      expect(intentosElement.innerHTML).toBe('0');
  
      // Check if darVuelta is attached to each card
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.click();
        expect(darVueltaSpy).toHaveBeenCalled();
      });
    });
  

  
  });
  