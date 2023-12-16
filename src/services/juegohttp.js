export { saveGame, getAllGames, updateGame, getGame, getAvailableGames };

import { updateData, createData, getData } from './PeticionesApi.js';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaXp2ZHB0a3VreHZ2bm9ma2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1MTE5MzIsImV4cCI6MjAxODA4NzkzMn0.g_39IVMiB_UHkGj-jnkC0wftLdSDeoYM37shB7LiAfc';

// Función para guardar una nueva partida en la tabla 'partidas'
async function saveGame(intentos, parejas_encontradas, duracion, usuario_id) {
  
  try {
    const token = localStorage.getItem('access_token');
    const newGame = await createData('partidas', token, {
      intentos,
      parejas_encontradas,
      duracion,
      usuario_id,
    });

    return newGame;
  } catch (error) {
    console.error('Error in saveGame:', error);
    throw error; 
  }
}

// Función para actualizar el estado de una partida en la tabla 'partidas'
async function updateGame(gameId, intentos, parejas_encontradas, duracion) {
  const token = localStorage.getItem('access_token');
  const updatedGame = await updateData(`partidas?id=eq.${gameId}`, token, {
    intentos,
    parejas_encontradas,
    duracion,
  });

  return updatedGame;
}

// Función para obtener una partida específica de la tabla 'partidas'
async function getGame(gameId) {
  const token = localStorage.getItem('access_token');
  const data = await getData(`partidas?id=eq.${gameId}&select=*`, token);
  return data[0];
}

// Función para obtener todas las partidas asociadas a un usuario de la tabla 'partidas'
async function getAllGames(usuario_id) {
  const token = localStorage.getItem('access_token');
  const data = await getData(`partidas?usuario_id=eq.${usuario_id}&select=*`, token);
  return data;
}

// Función para obtener todas las partidas disponibles en la tabla 'partidas'
async function getAvailableGames() {
  const token = localStorage.getItem('access_token');
  const data = await getData('partidas?started.eq.false&select=*', token);
  return data;
}
