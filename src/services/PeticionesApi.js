export { fileRequest, getFileRequest, supaRequest, loginSupabase, signUpSupabase, logoutSupabase }

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueHhndWlwaGNhZ2ptYXViaXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzMzkwMTMsImV4cCI6MjAxMzkxNTAxM30.w4yWhNDmDJC7h-D5kMG26a2YiBIBw1-tc41FpElh5xI";
const URL_BASE = "https://dnxxguiphcagjmaubiti.supabase.co";
const headers = {
    "apiKey": SUPABASE_KEY,
    "Content-Type": "application/json"
};

// función genérica para realizar solicitudes HTTP
async function supaRequest(url,method,headers,body){
    let response = await fetch(url,{ method, headers, body: JSON.stringify(body)});
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            return await response.json();
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

// función específica para cargar archivos
async function fileRequest(url,body,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
        "x-upsert": true 
    }; 
    let response = await fetch(`${URL_BASE}${url}`,{
        method: 'POST',
        headers: headersFile,
        body
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.json();
            datos.urlAvatar = `${URL_BASE}${url}`;
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

//función específica para descargar archivos
async function getFileRequest(url,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
    }; 
    let response = await fetch(`${url}`,{
        method: 'GET',
        headers: headersFile,
        
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.blob();
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function loginSupabase(email,password){ 
    try {
        let url = `${URL_BASE}/auth/v1/token?grant_type=password`;
        let data = await supaRequest(url, 'post', headers, { email, password });
        return data;
    } catch (error) {
        console.error("Error en la autenticación de Supabase:", error);
        throw error; // Relanzar el error para que pueda ser manejado por la función llamante
    }
}

async function signUpSupabase(email, password) {
    let url = `${URL_BASE}/auth/v1/register`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function logoutSupabase(token){ 
    let url = `${URL_BASE}/auth/v1/logout`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token}; // Destructuring
    let data = await supaRequest(url,'post',headersAux,{});
    return data;
}