import React, { useState, useEffect } from "react";
import "./Home.css";
import Title from "../../components/Title/Title";
import Filter from "../../components/Filtro/Filtro"; // Asegúrate de que la ruta del import sea correcta
import customIcon from "../../assets/img/Vector 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO, differenceInYears } from "date-fns";
import { Link } from "react-router-dom";
import { getAstronautsData } from "../../api";

function Home() {
  const [astronautas, setAstronautas] = useState([]);
  const [astronautasOriginales, setAstronautasOriginales] = useState([]);
  const [selectedNacionalidad, setSelectedNacionalidad] = useState("Todas");
  const [searchValue, setSearchValue] = useState(""); // Nuevo estado para la búsqueda

  useEffect(() => {
    const fetchAstronautas = async () => {
      const astronautasData = await getAstronautsData();
      setAstronautas(astronautasData);
      setAstronautasOriginales(astronautasData);
    };

    fetchAstronautas();
  }, []);

  const handleNacionalidadChange = (newNacionalidad) => {
    setSelectedNacionalidad(newNacionalidad);

    if (newNacionalidad === "Todas") {
      setAstronautas(astronautasOriginales);
    } else {
      const astronautasFiltrados = astronautasOriginales.filter(
        (astronauta) => astronauta.nationality === newNacionalidad
      );
      setAstronautas(astronautasFiltrados);
    }
  };

  const handleSearchNameChange = (newSearchName) => {
    setSearchValue(newSearchName);

    // Filtrar astronautas por nombre
    const filteredAstronauts = astronautasOriginales.filter((astronaut) =>
      astronaut.name.toLowerCase().includes(newSearchName.toLowerCase())
    );

    // Actualizar la lista de astronautas filtrados
    setAstronautas(filteredAstronauts);
  };

  return (
    <div className="home-container">
      <Title text="Astronautas" icon={customIcon} />
      <Filter
        filterType="nacionalidad"
        selectedNacionalidad={selectedNacionalidad}
        onFilterChange={handleNacionalidadChange}
        searchValue={searchValue} // Pasa el valor del campo de búsqueda
        onSearchChange={handleSearchNameChange} // Pasa la función para actualizar el campo de búsqueda
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
                to={`/resume/${astronauta.id}`}
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
