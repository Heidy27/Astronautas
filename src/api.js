// apiService.js

import axios from 'axios';

const API_BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

const retryDelayMs = 5000; // Espera 5 segundos antes de volver a intentar

export const getAstronaut = async () => {
  try {
    return await axios.get(`${API_BASE_URL}/astronaut/`)
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.status === 429) {
          // Error 429: Demasiadas solicitudes, espera antes de reintentar
          console.warn('Error 429: Demasiadas solicitudes, esperando antes de volver a intentar...');
          return new Promise(resolve => setTimeout(resolve, retryDelayMs))
            .then(() => getAstronaut()); // Reintentar después de la espera
        }
        console.error('Error al obtener astronautas:', error);
        throw error;
      });
  } catch (error) {
    console.error('Error al obtener astronautas:', error);
    throw error;
  }
};

export const getAstronautsByNacionalidad = async (nacionalidad) => {
  try {
    return await axios.get(`${API_BASE_URL}/astronaut/`, { params: { nationality: nacionalidad } })
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.status === 429) {
          // Error 429: Demasiadas solicitudes, espera antes de reintentar
          console.warn('Error 429: Demasiadas solicitudes, esperando antes de volver a intentar...');
          return new Promise(resolve => setTimeout(resolve, retryDelayMs))
            .then(() => getAstronautsByNacionalidad(nacionalidad)); // Reintentar después de la espera
        }
        console.error('Error al obtener astronautas por nacionalidad:', error);
        throw error;
      });
  } catch (error) {
    console.error('Error al obtener astronautas por nacionalidad:', error);
    throw error;
  }
};
