import "./App.css";
import { useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPokemons() {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemons/");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      data.results.map((pokemon) => {
        setPokemons((oldArray) => [...oldArray, { name: pokemon.name }]);
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='App'>
      <button className='pokemon-div' onClick={fetchPokemons}>
        Get Pokemons
      </button>

      {loading && "Loading Data"}
      {!loading && error && error}

      {!loading &&
        !error &&
        pokemons.length === 0 &&
        "No Data, Sorry something went wrong"}
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className='pokemon-div'>
          {pokemon.name}
        </div>
      ))}
    </div>
  );
}

export default App;
