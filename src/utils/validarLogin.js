export { validarForm };

function validarForm(login, passw) {
    if(login === null || passw === null || login === "" || passw === "") {
        return false;
    }

    return true;
}