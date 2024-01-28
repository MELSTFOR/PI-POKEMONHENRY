import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.style.css";
import bannerImage from "./bannerpokemon.png";

import { useDispatch, useSelector } from "react-redux";

import {
  getPokemons,
  getPokemonsByName,
  getTypesPokemons,
} from "../../redux/actions";
import { handleChangePage } from "../../views/home/home.component";

const ORDER_ALFABETICO = 0;
const ORDER_ATAQUE = 1;

function Navbar({ handleFiltered }) {
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState("ascendente");
  const [selectedType, setSelectedType] = useState("Filtrar por tipo");
  const [orderType, setOrderType] = useState(ORDER_ALFABETICO);
  const [selectedSource, setSelectedSource] = useState("source-all");

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.allPokemons);

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedSearchString = searchString.trim();

    const foundPokemon = allPokemons.find(
      (pokemon) =>
        pokemon.name.toLowerCase() === trimmedSearchString.toLowerCase()
    );

    if (foundPokemon) {
      handleFiltered([foundPokemon]);
    } else {
      handleFiltered(allPokemons);
    }
  }

  function handleSortChange(e) {
    setSortOrder(e.target.value);
  }

  function handleSourceChange(e) {
    setSelectedSource(e.target.value);
  }

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  function handleTypeChange(e) {
    const selectedType = e.target.value;

    if (selectedType === "Filtrar por tipo") {
      handleClearFilters();
    } else {
      setSelectedType(selectedType);
      const filteredByType = allPokemons.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );

      let sortedList = [];

      if (orderType === ORDER_ALFABETICO) {
        sortedList =
          sortOrder === "ascendente"
            ? filteredByType.sort((a, b) => a.name.localeCompare(b.name))
            : filteredByType.sort((a, b) => b.name.localeCompare(a.name));
      } else if (orderType === ORDER_ATAQUE) {
        sortedList =
          sortOrder === "ascendente"
            ? filteredByType.sort((a, b) => a.attack - b.attack)
            : filteredByType.sort((a, b) => b.attack - a.attack);
      }

      handleFiltered(sortedList);
    }
  }

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypesPokemons());
  }, [dispatch, selectedType]);

  function handleClearFilters() {
    setSearchString("");
    setSelectedType("Filtrar por tipo");
    setSortOrder("ascendente");

    filterAllPokemons("", selectedType);
    window.location.href = "/pokemons";
  }

  useEffect(() => {
    filterAllPokemons(searchString, selectedType);
  }, [allPokemons, selectedType, sortOrder, orderType, selectedSource]);

  function filterAllPokemons(searchString, selectedType) {
    let filteredList = [...allPokemons];

    console.log("Cleaning...", { searchString });

    if (searchString.trim() !== "") {
      filteredList = filteredList.filter(
        (pokemon) => pokemon.name.toLowerCase() === searchString.toLowerCase()
      );
    } else {
      if (selectedType !== "Filtrar por tipo") {
        filteredList = filteredList.filter((pokemon) =>
          pokemon.types.includes(selectedType)
        );
      }

      console.log({ orderType });

      if (orderType == ORDER_ALFABETICO) {
        if (sortOrder === "ascendente") {
          filteredList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === "descendente") {
          filteredList.sort((a, b) => b.name.localeCompare(a.name));
        }
      } else if (orderType == ORDER_ATAQUE) {
        if (sortOrder === "ascendente") {
          filteredList.sort((a, b) => a.attack - b.attack);
        } else if (sortOrder === "descendente") {
          filteredList.sort((a, b) => b.attack - a.attack);
        }
      }
    }

    if (selectedSource !== "source-all") {
      filteredList = filteredList.filter(({ source }) => {
        console.log({ source });
        return source === (selectedSource === "source-api" ? "Api" : "db");
      });
    }

    console.log({ filteredList });

    handleFiltered(filteredList);
  }

  return (
    <div className="navbar">
      <input
        type="text"
        id="searchInput"
        name="search"
        placeholder="Buscar"
        onChange={handleChange}
        value={searchString}
      />
      <button type="submit" onClick={handleSubmit}>
        Buscar
      </button>

      <select onChange={handleTypeChange} value={selectedType}>
        <option value="">Filtrar por tipo</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="shadow">Shadow</option>
      </select>

      <select onChange={handleSourceChange} value={selectedSource}>
        <option value="source-all">Todos los origenes</option>
        <option value="source-api">API</option>
        <option value="source-db">Base de datos</option>
      </select>

      <select
        id="orderTypeDropdown"
        onChange={handleOrderTypeChange}
        value={orderType}
      >
        <option value={ORDER_ALFABETICO}>Ordenar alfabeticamente</option>
        <option value={ORDER_ATAQUE}>Ordenar por ataque</option>
      </select>

      <select id="sortDropdown" onChange={handleSortChange} value={sortOrder}>
        <option value="ascendente">Ascendente</option>
        <option value="descendente">Descendente</option>
      </select>
      <Link to="/pokemons">
        <button onClick={handleClearFilters} className="clear-filters-button">
          Limpiar Filtros
        </button>
      </Link>

      <Link to="/create">
        <button>Crear Pokemon</button>
      </Link>
    </div>
  );
}

export default Navbar;
