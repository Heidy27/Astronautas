import React, { useState, useEffect } from "react";
import "./Filtro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAstronautsData } from "../../api";

function Filter({
  selectedNacionalidad,
  selectedEstado,
  onNacionalidadChange,
  onEstadoChange,
  searchValue,
  onSearchChange,
}) {
  const [nacionalidades, setNacionalidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [astronautData, setAstronautData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAstronautsData();
        setAstronautData(data);

        // Obtener opciones de filtro de nacionalidad
        const uniqueNacionalidades = [
          "Todas",
          ...data
            .map((astronaut) => astronaut.nationality)
            .filter((value, index, self) => self.indexOf(value) === index),
        ];
        setNacionalidades(uniqueNacionalidades);

        // Obtener opciones de filtro de estado
        const uniqueEstados = [
          "Todos",
          ...data
            .map((astronaut) => astronaut.status.name)
            .filter((value, index, self) => self.indexOf(value) === index),
        ];
        setEstados(uniqueEstados);
      } catch (error) {
        console.error(
          "Error al obtener la lista de opciones de filtro:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleNacionalidadChange = (event) => {
    const newValue = event.target.value;
    onNacionalidadChange(newValue);
  };

  const handleEstadoChange = (event) => {
    const newValue = event.target.value;
    onEstadoChange(newValue); // Actualizamos el valor seleccionado
  };

  const handleSearchInputChange = (event) => {
    const newValue = event.target.value;
    onSearchChange(newValue); // Actualizamos el valor de búsqueda
  };

  return (
    <div className="filter">
      <div className="filter-input">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="search-input"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" size="sm" />
      </div>
      <div className="filter-option">
        <label className="filter-label">Nacionalidad:</label>
        <div className="select-container">
          <select
            className="filter-select"
            value={selectedNacionalidad}
            onChange={handleNacionalidadChange}
          >
            {nacionalidades.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div>
        <div className="filter-option">
          <label className="filter-label">Estado:</label>
          <div className="select-container">
            <select
              className="filter-select"
              value={selectedEstado}
              onChange={handleEstadoChange}
            >
              {estados.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="select-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
