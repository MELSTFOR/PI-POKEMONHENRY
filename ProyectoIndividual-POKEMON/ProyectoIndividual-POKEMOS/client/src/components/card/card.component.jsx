import "./card.style.css";
import { Link } from "react-router-dom";

function Card({ pokemon }) {
  console.log(pokemon);
  const { image, name, types, id, attack } = pokemon;

  const typesString = types.join(" ");

  return (
    <div className="card">
      <Link to={`/pokemon/${name}`} className="enlaceSinSubrayado">
        <h2 className="nombreConEstilo">{name}</h2>{" "}
        <img src={image} alt={name} />
        <li style={{ listStyle: "none" }}>{typesString}</li>
        <li style={{ listStyle: "none" }}>
          Ataque: <b>{attack}</b>
        </li>
      </Link>
    </div>
  );
}

export default Card;
