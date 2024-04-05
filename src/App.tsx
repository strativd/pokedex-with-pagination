import { useFetch, usePagination } from "./hooks";
import { Pokemon } from "./types.ts";

import "./App.css";
import { FC } from "react";

const TOTAL_POKEMON = 151;
const PAGE_SIZE = 3;

type PokemonData = {
  results: Array<{
    name: string;
    url: string;
  }>;
};

function App() {
  return <PokemonList />;
}

const PokemonList = () => {
  const { currentPage, goToPage, nextPage, prevPage } = usePagination(
    TOTAL_POKEMON,
    PAGE_SIZE
  );

  const limit =
    currentPage * PAGE_SIZE > TOTAL_POKEMON
      ? TOTAL_POKEMON % PAGE_SIZE
      : PAGE_SIZE;
  const offset = currentPage * PAGE_SIZE - PAGE_SIZE;

  const { loading, error, data } = useFetch<PokemonData>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!data || loading || error) return null;

  const pokemonList = data.results;

  return (
    <div>
      <nav>
        <button
          disabled={!prevPage}
          onClick={() => prevPage && goToPage(prevPage)}
        >
          {" "}
          👈 Go back
        </button>
        <small>PAGE: {currentPage}</small>
        <button
          disabled={!nextPage}
          onClick={() => nextPage && goToPage(nextPage)}
        >
          Go forward 👉{" "}
        </button>
      </nav>
      <ul>
        {pokemonList.map(({ name, url }) => {
          return <PokemonCard key={url} name={name} />;
        })}
      </ul>
    </div>
  );
};

type PokemonCardProps = {
  name: string;
};

const PokemonCard: FC<PokemonCardProps> = ({ name }) => {
  const { data: pokemon } = useFetch<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  if (!pokemon) return null;

  return (
    <li>
      <div>
        <img src={pokemon.sprites.front_default} className="sprite" />
      </div>
      <div>
        {pokemon.name.toUpperCase()}
        <div className="pokemon-types">
          {pokemon.types.map(({ type }) => (
            <p className={`pokemon-type pokemon-type--${type.name}`}>
              {type.name}
            </p>
          ))}
        </div>
      </div>
    </li>
  );
};

export default App;
