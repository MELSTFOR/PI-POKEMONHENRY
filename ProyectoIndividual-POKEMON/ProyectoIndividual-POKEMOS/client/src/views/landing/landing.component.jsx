import React from "react";
import { Link } from "react-router-dom";
import "./landing.style.css";

function Landing() {
  return (
    <div className="background">
      <Link to="/pokemons">
        <button className="Landingbutton">
          <span>
            START
            <svg>
              <rect x="0" y="0" fill="none"></rect>
            </svg>
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Landing;
