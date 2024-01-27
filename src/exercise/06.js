// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

const actionTypes = {
  POKEMON_REQUEST: 'POKEMON_REQUEST',
  POKEMON_FAILED: 'POKEMON_FAILED',
  POKEMON_FOUND: 'POKEMON_FOUND'
}

function reducer(state, action) {

  switch (action.type) {
    case actionTypes.POKEMON_REQUEST: {
      return {
        showInvitation: false,
        showPokemonData: null,
        showProgressFor: action.pokemonName,
        showErrorMessage: null
      }
    }
    case actionTypes.POKEMON_FOUND: {
      return {
        showInvitation: false,
        showPokemonData: action.pokemonData,
        showProgressFor: null,
        showErrorMessage: null
      }
    }
    case actionTypes.POKEMON_FAILED: {
      return {
        showInvitation: false,
        showPokemonData: null,
        showProgressFor: null,
        showErrorMessage: action.errorMessage
      }
    }
    default: {
      throw new Error(`Unknown action.type:${action.type}`);
    }
  }
}



function PokemonInfo({pokemonName}) {

  const initialState = {
    showInvitation: true,
    showPokemonData: null,
    showProgressFor: null,
    showErrorMessage: null
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const prevRequestPokemonName = React.useRef(pokemonName);

  React.useEffect(() => {
    let applyAPIResults = true;

    async function getDataAndDispatch() {     
      try {
        dispatch({ type: actionTypes.POKEMON_REQUEST, pokemonName: pokemonName })
        prevRequestPokemonName.current = pokemonName;
        const pokemonData = await fetchPokemon(pokemonName);
        if (!applyAPIResults) return;
        dispatch({ type: actionTypes.POKEMON_FOUND, pokemonData: pokemonData })
      } catch (e) {
        if (!applyAPIResults) return;
        dispatch({ type: actionTypes.POKEMON_FAILED, errorMessage: e.message })
      }
    }

    if (!pokemonName) return;
    if (pokemonName === prevRequestPokemonName.current) return;

    getDataAndDispatch();
    return () => { applyAPIResults = false; }

  }, [pokemonName])


return (
  <>
    {state.showInvitation && "Submit a pokemon"}
    {state.showProgressFor && <PokemonInfoFallback name={state.showProgressFor} /> }
    {state.showPokemonData && <PokemonDataView pokemon={state.showPokemonData} /> }
    {state.showErrorMessage && (
      <div role="alert">
            There was an error: <pre style={{whiteSpace: 'normal'}}>{state.showErrorMessage}</pre>
          </div>
    )}
  </>
)

  // if (state.showInvitation) {

  // }

  // if (componentStatus === states.idle) {
  // }
  // if (componentStatus === states.pending) {
  //   return <PokemonInfoFallback name={pokemonName} />
  // }
  // if (componentStatus === states.rejected) {
  //   return <div role="alert">
  //           There was an error: <pre style={{whiteSpace: 'normal'}}>{pokemonFailure}</pre>
  //         </div>
  // }
  // return (
  //   <PokemonDataView pokemon={pokemonData} />
  // )

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
