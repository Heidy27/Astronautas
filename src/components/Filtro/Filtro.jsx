import React, { useState, useEffect } from "react";
import "./Filtro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../api";

function Filter({ filterType, selectedValue, onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState(["Todas"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ll.thespacedevs.com/2.2.0/astronaut/"
        );
        if (response.data && Array.isArray(response.data.results)) {
          let uniqueFilterOptions;

          if (filterType === "nacionalidad") {
            uniqueFilterOptions = [
              "Todas", // Agrega "Todas" como una opción
              ...new Set(
                response.data.results.map((astronaut) => astronaut.nationality)
              ),
            ];
          } else if (filterType === "estado") {
            uniqueFilterOptions = [
              "All",
              ...new Set(
                response.data.results.map((astronaut) => astronaut.status.name)
              ),
            ];
          }

          setFilterOptions(uniqueFilterOptions);
        } else {
          console.error(
            "La respuesta de la API no contiene datos de astronautas."
          );
        }
      } catch (error) {
        console.error(
          "Error al obtener la lista de opciones de filtro:",
          error
        );
        if (error.response && error.response.status === 429) {
          setTimeout(() => {
            fetchData();
          }, 1000);
        }
      }
    };

    fetchData();
  }, [filterType]);

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    onFilterChange(newValue);
  };

  return (
    <div className="filter">
      <div className="filter-input">
        <input
          type="text"
          placeholder="Buscar dentro"
          className="search-input"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" size="sm" />
      </div>
      <div className="filter-option">
        <label className="filter-label">
          {filterType === "nacionalidad" ? "Nacionalidad" : "Estado"}:
        </label>
        <div className="select-container">
          <select
            className="filter-select"
            value={selectedValue}
            onChange={handleFilterChange}
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
