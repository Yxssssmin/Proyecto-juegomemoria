export { loginUser, registerUser, loginWithToken, isLogged, logout }

import { loginSupabase, signUpSupabase, logoutSupabase } from "./PeticionesApi";


function expirationDate(expires_in){
    return Math.floor(Date.now() / 1000)+expires_in; 
}

async function loginUser(email, password) {
    let status = { success: false };

    try {
        // Realizar la autenticación con Supabase
        let dataLogin = await loginSupabase(email, password);
        console.log(dataLogin);
        
        localStorage.setItem("access_token", dataLogin.access_token); //Guardo en LocalStorage el token
        /*let user = await buscarPerfil("profiles?select=*&id=eq."+dataLogin.user.id,localStorage.getItem('access_token'))*/
        localStorage.setItem("uid", dataLogin.user.id);
        localStorage.setItem("email", dataLogin.user.email);
        localStorage.setItem("expirationDate",expirationDate(dataLogin.expires_in));
        
        status.success = true;

    } catch (err) {
        console.log(err);

        status.success = false;
        status.errorText = err.error_description || "Error desconocido al iniciar sesión.";
        document.getElementById('loginError').innerText = status.errorText
    }

    return status;
}

function loginWithToken(access_token,expires_in){
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("expirationDate",expirationDate(expires_in));
}

function isLogged(){
    if(localStorage.getItem('access_token')){
        if(localStorage.getItem('expirationDate') > Math.floor(Date.now() / 1000))
        {
            return true;
        }
    }
    return false;
}

    async function registerUser(email, password) {
    let status = { success: false };
    try {
            let data = signUpSupabase(email, password);
            console.log(data);
            status.success = true;
    }
    catch (err) {
        console.log(err);
        console.log("Hola");
        status.success = false;
        status.errorText = err.error_description;
    }
    return status;
}

function logout() {
    logoutSupabase(localStorage.getItem('access_token')).then(lOData => {
        console.log(lOData);
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        window.location.hash = '#/login';
    });

}