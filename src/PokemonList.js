import React from 'react';
import { Link } from "react-router-dom";

class PokemonList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <table className="table table-hover table-bordered table-striped">
          <tbody>
            <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Details</th>
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
            <img className="img-fluid" src={pokemon.image_url}/>
          </Link>
        </td>
      </tr>
    )
  }
}

export default PokemonList;