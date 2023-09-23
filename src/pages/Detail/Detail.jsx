import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/Title/Title";
import Filter from "../../components/Filtro/Filtro";
import customIcon from "../../assets/img/Vector 2.png";
import { Link } from "react-router-dom";
import "../Detail/Detail.css";
import axios from "axios";

function Detail() {
  const { id } = useParams();
  const [astronauta, setAstronauta] = useState(null);
  const [astronautas, setAstronautas] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredAstronauts, setFilteredAstronauts] = useState([]);

  useEffect(() => {
    const fetchAstronauta = async () => {
      try {
        const response = await axios.get(
          `https://ll.thespacedevs.com/2.2.0/astronaut/${id}`
        );
        if (response.data) {
          setAstronauta(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los detalles del astronauta:", error);
      }
    };

    const fetchAstronautas = async () => {
      try {
        const response = await axios.get(
          "https://ll.thespacedevs.com/2.2.0/astronaut/?limit=10&offset=10"
        );
        if (response.data && Array.isArray(response.data.results)) {
          setAstronautas(response.data.results);
          setFilteredAstronauts(response.data.results);
        }
      } catch (error) {
        console.error("Error al obtener astronautas:", error);
      }
    };

    fetchAstronauta();
    fetchAstronautas();
  }, [id]);

  useEffect(() => {
    const filtered = filterAstronautsByStatus(selectedStatus);
    setFilteredAstronauts(filtered);
  }, [selectedStatus]);

  const filterAstronautsByStatus = (status) => {
    if (status === "All") {
      return astronautas;
    } else {
      return astronautas.filter(
        (astronaut) => astronaut.status.name === status
      );
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  if (!astronauta || astronautas.length === 0) {
    return <p>Cargando detalles del astronauta...</p>;
  }

  return (
    <div className="detail-container">
      <Title text="Astronautas" icon={customIcon} />
      <Filter
        filterType="estado"
        selectedValue={selectedStatus}
        onFilterChange={handleStatusChange}
      />
      <table className="astronaut-table">
        <thead>
          <tr>
            <th>Perfil</th>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Estado Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAstronauts.map((astronaut) => (
            <tr key={astronaut.id}>
              <td>
                <img
                  src={astronaut.profile_image}
                  alt={`Imagen de ${astronaut.name}`}
                  width="49"
                  height="48"
                  style={{ flexShrink: 0 }}
                />
              </td>
              <td>{astronaut.name}</td>
              <td>{astronaut.nationality}</td>
              <td>
                <span
                  className={
                    astronaut.status.name === "Active"
                      ? "active-circle"
                      : "inactive-circle"
                  }
                ></span>
                <span
                  className={
                    astronaut.status.name === "Active"
                      ? "active-text"
                      : "inactive-text"
                  }
                >
                  {astronaut.status.name}
                </span>
              </td>
              <td>
                <Link
                  to={`/resume/${astronauta.id}`} // Lleva al usuario a la página Resume con el ID del astronauta
                >
                  Conoce más
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Detail;
