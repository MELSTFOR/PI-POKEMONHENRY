import { GET_POKEMONS } from "../actions";
import { GET_POKEMONS_DETAIL } from "../actions";
import { CLEAR_DETAILS } from "../actions";
import { GET_POKEMONS_BY_NAME } from "../actions";
import { GET_TYPES_POKEMONS } from "../actions";

let initialState = { allPokemons: [], pokemonDetail: [], allTypes: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_POKEMONS_DETAIL:
      console.log("GET_POKEMONS_DETAIL action:", action);
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        pokemonDetail: [],
      };
    case GET_POKEMONS_BY_NAME:
      return {
        ...state,
        allPokemons: action.payload,
      };
    case GET_TYPES_POKEMONS:
      return {
        ...state,
        allTypes: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
