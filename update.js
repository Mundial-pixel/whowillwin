const axios = require('axios');
const fs = require('fs');

async function obtenerPartidos() {
  try {
    const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
    const res = await axios.get(url);
    const eventos = res.data.events || [];
    
    const partidos = eventos.map(e => ({
      equipo1: e.competitions[0].competitors[0].team.displayName,
      equipo2: e.competitions[0].competitors[1].team.displayName,
      marcador1: e.competitions[0].competitors[0].score,
      marcador2: e.competitions[0].competitors[1].score,
      estado: e.status.type.description,
      minuto: e.status.displayClock
    }));
    
    fs.writeFileSync('partidos.json', JSON.stringify(partidos, null, 2));
    console.log('partidos.json actualizado con', partidos.length, 'partidos');
  } catch (error) {
    console.log('Error:', error.message);
    fs.writeFileSync('partidos.json', '[]');
  }
}

obtenerPartidos();
