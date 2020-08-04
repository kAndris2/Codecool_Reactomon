import React from 'react';
import { Link } from "react-router-dom";

class PokemonList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="card-group">
          {this.props.pokemons.map(this.mapPokemonToTableRow)}
        </div>
       
      </React.Fragment>
    );
  }

  mapPokemonToTableRow(pokemon) {
    return (
      <div key={pokemon.id} className="card">
        <img className="card-img-top" src={pokemon.image_url} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
          <p className="card-text"><Link to={`/pokemons/${pokemon.id}`}>
            {/* <img className="img-fluid" src={pokemon.image_url}/> */}
            Details
          </Link></p>
        </div>
      </div>
      
    )
  }
}

export default PokemonList;