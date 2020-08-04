import React from 'react';
import { Link } from "react-router-dom";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

    this.mapPokemonToTableRow = this.mapPokemonToTableRow.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  catchPokemon(pokemon) {
    //const pokemon = this.props.pokemons.find((pokemon) => pokemon.id === parseInt(this.props.match.params.id, 10));
    this.setState({count: this.state.count + 1});
    this.props.caught.push(pokemon);
  }

  caughtPokemon(pokemon) {
    return this.props.caught.includes(pokemon);
  }

  render() {
    return (
      <React.Fragment>
        <table className="table table-hover table-bordered table-striped">
          <tbody>
            <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Details</th>
                <th className="text-center">Catch</th>
            </tr>
            {this.props.pokemons.map(this.mapPokemonToTableRow)}
          </tbody>
        </table>
          
      </React.Fragment>
    );
  }

  mapPokemonToTableRow(pokemon) {
    return (
      <tr key={pokemon.id} className="list">

        <td className="text-center">
          {pokemon.name}
        </td>

        <td className="text-center">
          <Link to={`/pokemons/${pokemon.id}`}>
            Details
          </Link>
        </td>

        <td className="text-center">
          {this.caughtPokemon(pokemon) == true ? <h6>Caught!</h6> : <button onClick={() => this.catchPokemon(pokemon)}>Catch!</button>}
        </td>

      </tr>
    )
  }
}

export default PokemonList;