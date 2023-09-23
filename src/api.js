import axios from 'axios';

const API_BASE_URL = 'https://ll.thespacedevs.com/2.2.0';
const retryDelayMs = 5000; // Espera 5 segundos antes de volver a intentar

let astronautData = null;

export const getAstronautsData = async () => {
  if (astronautData === null) {
    try {
      const response = await axios.get(`${API_BASE_URL}/astronaut/`);
      if (response.data && Array.isArray(response.data.results)) {
        astronautData = response.data.results;
      } else {
        console.error("La respuesta de la API no contiene datos de astronautas.");
      }
    } catch (error) {
      console.error("Error al obtener los datos de astronautas:", error);
      if (error.response && error.response.status === 429) {
        console.warn('Error 429: Demasiadas solicitudes, esperando antes de volver a intentar...');
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
        return getAstronautsData();
      }
      throw error;
    }
  }

  return astronautData;
};
