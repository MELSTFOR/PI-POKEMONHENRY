// import "./detail.style.css";
// import React from "react";
// import "../../components/card/card.style.css";
// import "../../views/home/home.style.css";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getPokemonsDetail } from "../../redux/actions/index";

// function Detail({ pokemon }) {
//   const { id, name, hp, attack, defense, weight, height, speed } = pokemon;
//   const dispatch = useDispatch();
//   const allPokemons = useSelector((state) => state.allPokemons);

//   useEffect(() => {
//     dispatch(getPokemonsDetail(id));
//   }, [dispatch, id]);

//   return (
//     <div className="Detail">
//       <div className="DetailInfo">
//         <p>ID:{id}</p>
//         <p>NAME:{name}</p>
//         <p>HP:{hp}</p>
//         <p>ATTACK:{attack}</p>
//         <p>DEFENSE:{defense}</p>
//         <p>SPEED:{speed}</p>
//         <p>HEIGHT:{height}</p>
//         <p>WEIGHT:{weight}</p>
//       </div>
//       <div className="VectorImage"></div>
//     </div>
//   );
// }
// export default Detail;
import "./detail.style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsDetail, clearDetails } from "../../redux/actions/index";

function Detail() {
  const { id } = useParams(); // Obtenemos el ID del Pokemon de la URL
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);

  useEffect(() => {
    dispatch(getPokemonsDetail(id));
    return () => {
      dispatch(clearDetails(id));
    };
  }, [dispatch, id]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  // const { name, hp, attack, defense, weight, height, speed } = pokemon;

  return (
    <div className="Detail">
      <div className="DetailInfo">
        <div className="text-column">
          <h2>NAME: {pokemonDetail.name}</h2>
          <p>ID: {pokemonDetail.id}</p>
          <p>HP: {pokemonDetail.hp}</p>
          <p>ATTACK: {pokemonDetail.attack}</p>
          <p>DEFENSE: {pokemonDetail.defense}</p>
          <p>SPEED: {pokemonDetail.speed}</p>
          <p>HEIGHT: {pokemonDetail.height}</p>
          <p>WEIGHT: {pokemonDetail.weight}</p>
          <p>TYPES: {pokemonDetail.types}</p>
        </div>
        <div className="imagendetail">
          <img src={pokemonDetail.image} alt={pokemonDetail.name} />
        </div>
      </div>
      <div className="VectorImage"></div>
    </div>
  );
}

export default Detail;
