import { loginUser, registerUser } from "../src/services/users.js";
import { Login } from "../src/views/formLogin.js";
import { Game } from "../src/views/juegoMemoria.js";

describe('Funciones del Juego', function() {

  // Establecer el cuerpo del documento con un contenedor principal vacío
  document.body.innerHTML = '<div id="principal"></div>';
 
  it('debería reiniciar correctamente el estado del juego', function() {
    // Crear una instancia del juego
    const juego = new Game();
    
    const darVueltaSpy = spyOn(juego, 'darVuelta').and.callThrough();

    // Llamar a la función generateGame
    juego.generateGame();

    // Obtener la referencia a las cartas
    const cards = document.querySelectorAll('.card');

    // Llamar a la función reiniciarJuego
    juego.reiniciarJuego();

    // Verificar si se reinicia el estado del juego
    expect(juego.parejas).toBe(0);
    expect(juego.tar_1).toBeUndefined();
    expect(juego.tar_2).toBeUndefined();
    expect(juego.deshabilitarCartas).toBe(false);

    // Verificar si se reinician los elementos num_parejas e intentos
    const numParejasElement = document.querySelector('.container h2 span');
    const intentosElement = document.querySelector('#intentos');
    expect(numParejasElement.innerHTML).toBe('0');
    expect(intentosElement.innerHTML).toBe('0');

    // Verificar si darVuelta está adjunto a cada carta después de reiniciar el juego
    cards.forEach(card => {
      // Simular un evento de clic
      card.dispatchEvent(new Event('click'));
      // Verificar que darVuelta se llame con los argumentos correctos
      expect(darVueltaSpy).toHaveBeenCalledWith(jasmine.any(Object));
    });
  });
});


  describe('Login Module', () => {
    let login;
  
    beforeEach(() => {
      // Configurar el entorno antes de cada prueba
      login = new Login();
    });
  
    it('Login functionality', async () => {
      const email = 'ejemplo@gmail.com';
      const password = 'ejemplo123';
  
      // Mockear la respuesta del servicio de login
      spyOn(loginUser, 'loginUser').and.returnValue(Promise.resolve({ success: true }));
  
      // Llamar a la función de login
      await login.generateLogin();
  
      // Obtener el botón de login y simular un clic
      const loginButton = document.querySelector('#botonLogin');
      loginButton.click();
  
      // Comprobar si la función de loginUser se llamó correctamente
      expect(loginUser.loginUser).toHaveBeenCalledWith(email, password);
  
    });
  });

  describe('Register Module', () => {

    let login;

    beforeEach(() => {
      // Configurar el entorno antes de cada prueba
      login = new Login();
    });

    it('Registration functionality', async () => {
      const email = 'ejemplo@gmail.com';
      const password = 'ejemplo123';
  
      // Mockear la respuesta del servicio de registro
      spyOn(registerUser, 'registerUser').and.returnValue(Promise.resolve({ success: true }));
  
      // Llamar a la función de registro
      await login.generateRegister();
  
      // Obtener el botón de registro y simular un clic
      const registerButton = document.querySelector('#botonRegistro');
      registerButton.click();
  
      // Comprobar si la función de registerUser se llamó correctamente
      expect(registerUser.registerUser).toHaveBeenCalledWith(email, password);

    });
  
  });



  