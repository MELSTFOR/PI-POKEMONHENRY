import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPokemons,
  getPokemonsByName,
  getTypesPokemons,
} from "../../redux/actions";

import Navbar from "../../components/navbar/navbar.component";
import Cards from "../../components/cards/cards.component";
import "./home.style.css";
import "../../components/card/card.style.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.allTypes);

  const [filtered, setFiltered] = useState(allPokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const handleFiltered = (pokemons) => {
    setFiltered(pokemons);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="Home">
      <div className="content-container">
        <Navbar handleFiltered={handleFiltered} />
        <Cards
          allPokemons={currentItems}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;
