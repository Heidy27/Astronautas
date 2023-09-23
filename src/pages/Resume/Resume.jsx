import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Title from "../../components/Title/Title";
import customIcon from "../../assets/img/Vector 2.png";
import "./Resume.css";
import { getAstronautDataById } from "../../api";

function Resume() {
  const { id } = useParams();
  const [astronautData, setAstronautData] = useState(null);

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
                  </div>
                </div>
              </div>
              <hr className="divider" />
              <div className="additional-content">
                <p>Descripción:</p>
                <p>{astronautData.bio}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Accordion({ year, description }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button className="accordion-button" onClick={() => setIsOpen(!isOpen)}>
        {year} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && <p>{description}</p>}
    </div>
  );
}

export default Resume;
