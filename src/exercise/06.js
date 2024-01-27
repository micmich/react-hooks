// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {

  const states = {
    idle: 'idle',
    pending: 'pending',
    resolved: 'resolved',
    rejected:  'rejected',
  }

  const [componentStatus, setComponentStatus] = React.useState(states.idle);
  const [pokemonData, setPokemonData] = React.useState(null);
  const [pokemonFailure, setPokemonFailure] = React.useState(null);
  const prevRequestName = React.useRef(pokemonName);

  React.useEffect(() => {
    let applyResponse = true;
    async function execFetch() {
      try {
        prevRequestName.current = pokemonName;
        const pokemonData = await fetchPokemon(pokemonName);
        if (!applyResponse) return;
        setPokemonData(pokemonData);
        setComponentStatus(states.resolved);
      } catch (e) {
        if (!applyResponse) return;
        console.error("Response", e);
        setComponentStatus(states.rejected);
        setPokemonData(null);
        setPokemonFailure(e.message);
      }
    }

    if (!pokemonName) {
      console.log("skipping empty pokemonName");
      return;
    }
    if (prevRequestName.current === pokemonName) {
      console.log("Pokemon name already retrieved:", pokemonName);
      return;
    }

    console.log("Retrieving pokemon:", pokemonName)
    setPokemonData(null);
    setPokemonFailure(null);
    execFetch();
    setComponentStatus(states.pending);  

    return () => { 
      applyResponse = false; 
    }

  }, [pokemonName]);

  if (componentStatus === states.idle) {
    return "Submit a pokemon"
  }
  if (componentStatus === states.pending) {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (componentStatus === states.rejected) {
    return <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{pokemonFailure}</pre>
          </div>
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
