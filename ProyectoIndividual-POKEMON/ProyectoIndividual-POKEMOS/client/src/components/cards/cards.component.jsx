import "./cards.style.css";
import Card from "../card/card.component";

function Cards({ allPokemons, totalPages, currentPage, handlePageChange }) {
  return (
    <div className="cards-container">
      <div className="card-list">
        {allPokemons?.map((pokemon) => (
          <Card pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cards;
