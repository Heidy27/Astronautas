import React, { useState, useEffect } from "react";
import "./Home.css";
import Title from "../../components/Title/Title";
import Filter from "../../components/Filtro/Filtro";
import customIcon from "../../assets/img/Vector 2.png";
import { format, parseISO, differenceInYears } from "date-fns";
import { getAstronautsData } from "../../api";
import wikipediaIcon from "../../assets/img/fb.svg";
import instagramIcon from "../../assets/img/ig.svg";
import twitterIcon from "../../assets/img/tw.svg";
import { Link } from "react-router-dom";

function Home() {
  const [astronautas, setAstronautas] = useState([]);
  const [astronautasOriginales, setAstronautasOriginales] = useState([]);
  const [selectedNacionalidad, setSelectedNacionalidad] = useState("Todas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [searchValue, setSearchValue] = useState("");

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

  const handleEstadoChange = (newEstado) => {
    setSelectedEstado(newEstado);

    if (newEstado === "Todos") {
      setAstronautas(astronautasOriginales);
    } else {
      const astronautasFiltrados = astronautasOriginales.filter(
        (astronauta) => astronauta.status.name === newEstado
      );
      setAstronautas(astronautasFiltrados);
    }
  };

  const handleSearchNameChange = (newSearchName) => {
    setSearchValue(newSearchName);

    const filteredByName = astronautasOriginales.filter((astronaut) =>
      astronaut.name.toLowerCase().includes(newSearchName.toLowerCase())
    );

    const filteredByNacionalidad =
      selectedNacionalidad === "Todas"
        ? filteredByName
        : filteredByName.filter(
            (astronauta) => astronauta.nationality === selectedNacionalidad
          );

    const filteredByEstado =
      selectedEstado === "Todos"
        ? filteredByNacionalidad
        : filteredByNacionalidad.filter(
            (astronauta) => astronauta.status.name === selectedEstado
          );

    setAstronautas(filteredByEstado);
  };

  return (
    <div className="home-container">
      <Title text="Astronautas" icon={customIcon} />
      <Filter
        selectedNacionalidad={selectedNacionalidad}
        selectedEstado={selectedEstado}
        onNacionalidadChange={handleNacionalidadChange}
        onEstadoChange={handleEstadoChange}
        searchValue={searchValue}
        onSearchChange={handleSearchNameChange}
      />
      <div className="astronaut-card-container">
        {astronautas.map((astronauta) => (
          <div className="astronaut-card" key={astronauta.id}>
            <div className="astronaut-image">
              <img
                src={astronauta.profile_image}
                alt={`Imagen de ${astronauta.name}`}
              />
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
                  <Link to={`/resume/${astronauta.id}`} className="link">
                    Conoce más
                  </Link>
                </span>
              </div>
            </div>

            <div className="astronaut-description">
              <hr />
              <div className="additional-content">
                <p className="limited-description">
                  {astronauta.bio.length > 150
                    ? astronauta.bio.substring(0, 150) + "..."
                    : astronauta.bio}
                </p>
              </div>
              <div className="social-media">
                {astronauta.twitter && (
                  <a
                    href={astronauta.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={twitterIcon} alt="Twitter" />
                  </a>
                )}
                {astronauta.instagram && (
                  <a
                    href={astronauta.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                )}
                {astronauta.wiki && (
                  <a
                    href={astronauta.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={wikipediaIcon} alt="Wikipedia" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
