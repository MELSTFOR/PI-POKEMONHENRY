import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_DETAIL = "GET_POKEMONS_DETAIL";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const GET_POKEMONS_BY_NAME = "GET_POKEMONS_BY_NAME";
export const GET_TYPES_POKEMONS = "GET_TYPES_POKEMONS";

export function getPokemons(name) {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001${name ? `?name=${name}` : ""}`
    );
    return dispatch({
      type: "GET_POKEMONS",
      payload: response.data,
    });
  };
}

export function getPokemonsByName(name) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/?name=${name}`);
    console.log(response.data);

    return dispatch({
      type: "GET_POKEMONS_BY_NAME",
      payload: response.data,
    });
  };
}
export function getTypesPokemons() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/type`);

    return dispatch({
      type: "GET_TYPES_POKEMONS",
      payload: response.data,
    });
  };
}

export function getPokemonsDetail(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001?name=${name}`); // Ajusta la URL para obtener detalles por ID
      const pokemon = response.data;
      return dispatch({
        type: GET_POKEMONS_DETAIL,
        payload: pokemon,
      });
    } catch (error) {}
  };
}
export const clearDetails = () => {
  return {
    type: "CLEAR_DETAILS",
  };
};
