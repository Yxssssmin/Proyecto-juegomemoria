export { fileRequest, getFileRequest, supaRequest, loginSupabase, signUpSupabase, logoutSupabase, recoverPasswordSupabase, getData, createData, updateData }

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueHhndWlwaGNhZ2ptYXViaXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzMzkwMTMsImV4cCI6MjAxMzkxNTAxM30.w4yWhNDmDJC7h-D5kMG26a2YiBIBw1-tc41FpElh5xI";

const URL_BASE = "https://dnxxguiphcagjmaubiti.supabase.co";
const headers = {
    apiKey: SUPABASE_KEY,
    "Content-Type": "application/json"
};

// función genérica para realizar solicitudes HTTP
async function supaRequest(url, method, headers, body) {
    // Realizar la solicitud HTTP utilizando fetch
    let response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    // Verificar si la respuesta es exitosa (código de estado 2xx)
    if (response.status >= 200 && response.status <= 300) {
        // Verificar si la respuesta tiene un contenido (content-type)
        if (response.headers.get("content-type")) {
            // Devolver el cuerpo de la respuesta como JSON
            return await response.json();
        }
        // Si no hay contenido, devolver un objeto vacío
        return {};
    } else {
        // Si la respuesta no es exitosa, rechazar la promesa con el cuerpo de la respuesta como JSON
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
    let url = `${URL_BASE}/auth/v1/signup`;
    let data = await supaRequest(url,'post', headers,{ email, password });
    return data;
}

async function logoutSupabase(token) { 
    let url = `${URL_BASE}/auth/v1/logout`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token}; // Destructuring
    let data = await supaRequest(url,'post', headersAux, {});
    return data;
}

async function recoverPasswordSupabase(email) {
    const url = `${URL_BASE}/auth/v1/recover`;
    const headersAux = { ...headers };
    const data = await supaRequest(url, 'post', headersAux, { email });
    return data;
}

async function getData(URI,token){
    let url = `${URL_BASE}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token}; // Destructuring
    let data = await supaRequest(url,'get',headersAux); // Las peticiones get no me funcionan y no se porque, pienso que las hago bien
    return data;
}

async function updateData(URI,token,data){
    let url = `${URL_BASE}/rest/v1/${URI}`;
    let headersAux = {...headers, // Destructuring
        Authorization: `Bearer ${token}`,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'PATCH',headersAux,data);
    return response;
}

async function createData(URI,token,data){
    let url = `${URL_BASE}/rest/v1/${URI}`;
    let headersAux = {...headers, // Desstucturing
        Authorization: `Bearer ${token}`,
        "Prefer" : "return=minimal"
    };
    let response = await supaRequest(url,'post',headersAux,data);
    return response;
}