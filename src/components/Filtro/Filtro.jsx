import React, { useState, useEffect } from "react";
import "./Filtro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAstronautsData } from "../../api";

function Filter({ filterType, selectedValue, onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState(["Todas"]);
  const [searchValue, setSearchValue] = useState("");
  const [astronautData, setAstronautData] = useState([]);
  const [filteredAstronauts, setFilteredAstronauts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAstronautsData();
        setAstronautData(data);
        setFilteredAstronauts(data);
        let uniqueFilterOptions;

        if (filterType === "nacionalidad") {
          uniqueFilterOptions = [
            "Todas",
            ...data
              .map((astronaut) => astronaut.nationality)
              .filter((value, index, self) => self.indexOf(value) === index),
          ];
        } else if (filterType === "estado") {
          uniqueFilterOptions = [
            "All",
            ...data
              .map((astronaut) => astronaut.status.name)
              .filter((value, index, self) => self.indexOf(value) === index),
          ];
        }

        setFilterOptions(uniqueFilterOptions);
      } catch (error) {
        console.error(
          "Error al obtener la lista de opciones de filtro:",
          error
        );
      }
    };

    fetchData();
  }, [filterType]);

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    onFilterChange(newValue);
  };

  const handleSearchInputChange = (event) => {
    const newValue = event.target.value;
    setSearchValue(newValue);

    // Filtrar astronautas por nombre
    const filteredAstronauts = astronautData.filter((astronaut) =>
      astronaut.name.toLowerCase().includes(newValue.toLowerCase())
    );

    // Actualizar la lista de astronautas filtrados
    setFilteredAstronauts(filteredAstronauts);
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
