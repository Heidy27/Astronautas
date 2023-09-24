import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import customIcon from "../../assets/img/Vector 2.png";
import wikipediaIcon from "../../assets/img/fb.svg";
import instagramIcon from "../../assets/img/ig.svg";
import twitterIcon from "../../assets/img/tw.svg";
import "./Resume.css";
import { getAstronautDataById } from "../../api";

function Resume() {
  const { id } = useParams();
  const [astronautData, setAstronautData] = useState(null);
  const [agencyAccordionOpen, setAgencyAccordionOpen] = useState(false);
  const [missionsAccordionOpen, setMissionsAccordionOpen] = useState(false);

  useEffect(() => {
    const fetchAstronautData = async () => {
      const data = await getAstronautDataById(id);
      if (data) {
        setAstronautData(data);
      }
    };

    fetchAstronautData();
  }, [id]);

  return (
    <div className="resume-container">
      <Title text="Astronautas" icon={customIcon} />

      <div className="columns-container">
        <div className="left-column">
          {astronautData && (
            <div className="astronaut-details">
              <div className="astronaut-image">
                <img
                  src={astronautData.profile_image}
                  alt={`Imagen de ${astronautData.name}`}
                />
                <div className="astronaut-info">
                  <h2>{astronautData.name}</h2>
                  <p>Nacionalidad: {astronautData.nationality}</p>
                  <p>Nacimiento: {astronautData.date_of_birth}</p>
                  <p>Edad: {astronautData.age} años</p>
                  <div className="status-and-social">
                    <div className="status">
                      <span>
                        {astronautData.status.name === "Active" ? (
                          <>
                            <span className="active-circle"></span>
                            <span className="active-text">Activo</span>
                          </>
                        ) : (
                          <>
                            <span className="inactive-circle"></span>
                            <span className="inactive-text">Inactivo</span>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="social-icons">
                      <a
                        href={astronautData.wiki}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={wikipediaIcon} alt="Wikipedia" />
                      </a>
                      <a
                        href={astronautData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={instagramIcon} alt="Instagram" />
                      </a>
                      <a
                        href={astronautData.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={twitterIcon} alt="Twitter" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divider" />
              <div className="additional-content">
                <p>Descripción:</p>
                <p>{astronautData.bio}</p>
                <Link to="/" className="home-link">
                  Volver a la página de inicio
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="right-column">
          {astronautData && (
            <div className="accordion-container">
              <div className="accordion-title">
                <p>Misiones Espaciales</p>
                <hr />
              </div>
              <button
                onClick={() => setAgencyAccordionOpen(!agencyAccordionOpen)}
              >
                Ver detalles de la agencia
              </button>
              {agencyAccordionOpen && (
                <div className="accordion-details">
                  <p>Nombre de la agencia: {astronautData.agency.name}</p>
                  <p>Tipo: {astronautData.agency.type}</p>
                </div>
              )}

              <button
                onClick={() => setMissionsAccordionOpen(!missionsAccordionOpen)}
              >
                Ver detalles de misiones espaciales
              </button>
              {missionsAccordionOpen && (
                <div className="accordion-details">
                  <p>Tiempo en el espacio: {astronautData.time_in_space}</p>
                  <p>Tiempo de caminata espacial: {astronautData.eva_time}</p>
                  <p>Cantidad de vuelos: {astronautData.flights_count}</p>
                  <p>Cantidad de aterrizajes: {astronautData.landings_count}</p>
                  <p>
                    Cantidad de caminatas espaciales:{" "}
                    {astronautData.spacewalks_count}
                  </p>
                  <p>Último vuelo: {astronautData.last_flight}</p>
                  <p>Primer vuelo: {astronautData.first_flight}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume;
