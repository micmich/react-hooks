// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [pokemonData, setPokemonData] = React.useState(null);
  const prevRequestName = React.useRef(pokemonName);

  React.useEffect(() => {
    let applyResponse = true;
    async function execFetch() {
      try {
        const pokemonData = await fetchPokemon(pokemonName);
        if (!applyResponse) return;
        setPokemonData(pokemonData);
      } catch (e) {
        console.error("Response", e);
        setPokemonData(null);
      }
    }
    if (prevRequestName.current === pokemonName) {
      return;
    }

    prevRequestName.current = pokemonName;
    setPokemonData(null);

    execFetch();
    return () => { 
      setPokemonData(null);
      applyResponse = false; 
    }

  }, [pokemonName]);

  if (!pokemonName) {
    return "Enter pokemon name"
  }
  if (!pokemonData) {
    console.log('No pokemonData', pokemonName);
    return (
      <PokemonInfoFallback name={pokemonName} />
    )
  }
  return (
    <PokemonDataView pokemon={pokemonData} />
  )

  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
