import axios from 'axios';

const API_BASE_URL = 'https://ll.thespacedevs.com/2.2.0';

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
      throw error;
    }
  }

  return astronautData;
};

export const getAstronautDataById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/astronaut/${id}`);
    if (response.data) {
      return response.data;
    } else {
      console.error("La respuesta de la API no contiene datos del astronauta con ID:", id);
    }
  } catch (error) {
    console.error("Error al obtener los datos del astronauta:", error);
    throw error;
  }
};

export const getAstronautsByNacionalidad = async (nacionalidad) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/astronaut/`, { params: { nationality } });
    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      console.error("La respuesta de la API no contiene datos de astronautas para la nacionalidad:", nacionalidad);
    }
  } catch (error) {
    console.error("Error al obtener los datos de astronautas por nacionalidad:", error);
    throw error;
  }
};
