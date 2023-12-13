export { validarLogin };


function validarLogin(login, passw) {
    if(login === null || passw === null || login === "" || passw === "") {
        return false;
    }

    return true;
}