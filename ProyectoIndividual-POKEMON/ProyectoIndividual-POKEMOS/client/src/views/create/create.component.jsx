import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './create.style.css';

function Create() {
  const [pokemonsTypes, setPokemonsTypes] = useState([]);

  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  const [error, setError] = useState({
    name: 'Mínimo 3, máximo 10 caracteres, solo letras',
    image: 'Ingrese una URL válida para la imagen',
    hp: 'Ingrese un número válido entre 1 y 100',
    attack: 'Ingrese un número válido entre 1 y 100',
    defense: 'Ingrese un número válido entre 1 y 100',
    speed: 'Ingrese un número válido entre 1 y 100',
    height: 'Ingrese un número válido entre 1 y 100',
    weight: 'Ingrese un número válido entre 1 y 100',
    types: 'Seleccione al menos un tipo',
  });

  const handleTypeChange = (e) => {
    let values = Array.from(e.target.selectedOptions, (option) => option.value);

    setInput({
      ...input,
      types: values,
    });

    validateTypes(values);
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'name') {
      validateName(e.target.value);
    } else if (e.target.name === 'image') {
      validateImage(e.target.value);
    } else if (
      ['hp', 'attack', 'defense', 'speed', 'height', 'weight'].includes(
        e.target.name
      )
    ) {
      validateNumericField(e.target.name, e.target.value);
    }
  }

  function validateName(value) {
    if (value.length < 3 || value.length > 10 || /\d/.test(value)) {
      setError({ ...error, name: 'Formato inválido' });
    } else {
      setError({ ...error, name: '' });
    }
  }

  function validateImage(value) {
    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
      setError({ ...error, image: 'Ingrese una URL válida para la imagen' });
    } else {
      setError({ ...error, image: '' });
    }
  }

  function validateNumericField(field, value) {
    if (isNaN(value) || /[a-zA-Z]/.test(value) || value < 1 || value > 100) {
      setError({
        ...error,
        [field]: 'Formato inválido o número fuera de rango (1-100)',
      });
    } else {
      setError({ ...error, [field]: '' });
    }
  }

  function validateTypes(types) {
    if (types.length === 0) {
      setError({ ...error, types: 'Seleccione al menos un tipo' });
    } else {
      setError({ ...error, types: '' });
    }
  }

  const handleSave = async (event) => {
    event.preventDefault();

    validateName(input.name);
    validateImage(input.image);

    validateNumericField('hp', input.hp);
    validateNumericField('attack', input.attack);
    validateNumericField('defense', input.defense);
    validateNumericField('speed', input.speed);
    validateNumericField('height', input.height);
    validateNumericField('weight', input.weight);

    validateTypes(input.types);

    const hasErrors = Object.values(error).some((errMsg) => errMsg);

    if (hasErrors) {
      alert('Por favor, complete los campos correctamente.');
      return;
    }

    const url = 'http://localhost:3001';

    try {
      await axios.post(url, input);

      alert('El Pokemon se creó correctamente.');

      setInput({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
      });

      setError({
        name: '',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: '',
      });
    } catch (error) {
      alert('Error al crear el Pokemon.');
    }
  };

  const getPokemonsTypes = async () => {
    const url = 'http://localhost:3001/type';

    const types = await axios.get(url);

    setPokemonsTypes(types.data);
  };

  useEffect(() => {
    getPokemonsTypes();
  }, []);

  return (
    <div className="imgCreate">
      <h2 className="Create-Title">Crea tu propio Pokemon</h2>

      <form onSubmit={handleSave} className="game-form">
        <div className="game-form-container">
          <div className="column">
            <div className="form-group">
              <label>Nombre</label>
              <input name="name" value={input.name} onChange={handleChange} />
              <span className="error">{error.name}</span>
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input name="image" value={input.image} onChange={handleChange} />
              <span className="error">{error.image}</span>
            </div>
            <div className="form-group">
              <label>Vida</label>
              <input name="hp" value={input.hp} onChange={handleChange} />
              <span className="error">{error.hp}</span>
            </div>
            <div className="form-group">
              <label>Ataque</label>
              <input
                name="attack"
                value={input.attack}
                onChange={handleChange}
              />
              <span className="error">{error.attack}</span>
            </div>
          </div>
          <div className="column">
            <div className="form-group">
              <label>Defensa</label>
              <input
                name="defense"
                value={input.defense}
                onChange={handleChange}
              />
              <span className="error">{error.defense}</span>
            </div>
            <div className="form-group">
              <label>Velocidad</label>
              <input name="speed" value={input.speed} onChange={handleChange} />
              <span className="error">{error.speed}</span>
            </div>
            <div className="form-group">
              <label>Altura</label>
              <input
                name="height"
                value={input.height}
                onChange={handleChange}
              />
              <span className="error">{error.height}</span>
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input
                name="weight"
                value={input.weight}
                onChange={handleChange}
              />
              <span className="error">{error.weight}</span>
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select
                multiple
                name="types"
                value={input.types}
                onChange={handleTypeChange}
              >
                <option value="">Seleccione un tipo</option>
                {pokemonsTypes.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </select>
              <span className="error">{error.types}</span>
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="Guardar" />
        </div>
      </form>
    </div>
  );
}

export default Create;
