import "./App.css";
import { useState, useCallback, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");

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
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  let content = <div>No Data Found</div>;
  if (pokemons.length > 0) {
    content = pokemons.map((pokemon) => (
      <div key={pokemon.name} className='pokemon-div'>
        {pokemon.name}
      </div>
    ));
  } else if (error) {
    content = error;
  } else if (loading) {
    content = <div>Loading Data</div>;
  }
  return (
    <div className='App'>
      <button className='pokemon-div' onClick={fetchPokemons}>
        Get Pokemons
      </button>
      {content}
    </div>
  );
}

export default App;
