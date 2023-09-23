import React, { useState, useEffect } from "react";
import "./Home.css";
import Title from "../../components/Title/Title";
import Filter from "../../components/Filtro/Filtro";
import customIcon from "../../assets/img/Vector 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO, differenceInYears } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [astronautas, setAstronautas] = useState([]);
  const [astronautasOriginales, setAstronautasOriginales] = useState([]);
  const [selectedNacionalidad, setSelectedNacionalidad] = useState("Todas");

  useEffect(() => {
    const fetchAstronautas = async () => {
      try {
        const response = await axios.get(
          "https://ll.thespacedevs.com/2.2.0/astronaut/?limit=10&offset=10"
        );
        if (response.data && Array.isArray(response.data.results)) {
          setAstronautas(response.data.results);
          setAstronautasOriginales(response.data.results); // Guarda una copia de los astronautas originales
        }
      } catch (error) {
        console.error("Error al obtener astronautas:", error);
      }
    };

    fetchAstronautas();
  }, []);

  const handleNacionalidadChange = (newNacionalidad) => {
    setSelectedNacionalidad(newNacionalidad);

    // Filtrar astronautas en función de la nacionalidad
    if (newNacionalidad === "Todas") {
      // Restaurar la lista de astronautas originales
      setAstronautas(astronautasOriginales);
    } else {
      // Filtrar por la nacionalidad seleccionada
      const astronautasFiltrados = astronautasOriginales.filter(
        (astronauta) => astronauta.nationality === newNacionalidad
      );
      setAstronautas(astronautasFiltrados);
    }
  };

  return (
    <div className="home-container">
      <Title text="Astronautas" icon={customIcon} />
      <Filter
        filterType="nacionalidad"
        selectedNacionalidad={selectedNacionalidad}
        onFilterChange={handleNacionalidadChange}
      />
      <div className="astronaut-card-container">
        {astronautas.map((astronauta) => (
          <div className="astronaut-card" key={astronauta.id}>
            <div className="astronaut-image">
              <img
                src={astronauta.profile_image}
                alt={`Imagen de ${astronauta.name}`}
              />
            </div>
            <div className="astronaut-details">
              <h2>{astronauta.name}</h2>
              <p>{astronauta.nationality}</p>
              <p>
                Fecha de Nacimiento:{" "}
                {format(parseISO(astronauta.date_of_birth), "dd/MM/yyyy")}
              </p>
              <p>
                Edad:{" "}
                {differenceInYears(
                  new Date(),
                  parseISO(astronauta.date_of_birth)
                )}
              </p>
              <span>
                {astronauta.status.name === "Active" ? (
                  <span className="active-circle"></span>
                ) : (
                  <span className="inactive-circle"></span>
                )}
                <span
                  className={
                    astronauta.status.name === "Active"
                      ? "active-text"
                      : "inactive-text"
                  }
                >
                  {astronauta.status.name}
                </span>
              </span>
              <Link
                to={`/detail/${astronauta.id}`} // Utiliza el id del astronauta en la URL
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conoce más
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
