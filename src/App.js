import "./App.css";
import { useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPokemons() {
    setLoading(true);
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();

    data.results.map((pokemon) => {
      setPokemons((oldArray) => [...oldArray, { name: pokemon.name }]);
    });

    setLoading(false);
  }

  return (
    <div className='App'>
      <button className='pokemon-div' onClick={fetchPokemons}>
        Get Pokemons
      </button>
      {loading && "Loading Data"}
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className='pokemon-div'>
          {pokemon.name}
        </div>
      ))}
    </div>
  );
}

export default App;
