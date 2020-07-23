import React from 'react';
import { withRouter } from "react-router";
import swal from 'sweetalert'

class PokemonDetail extends React.Component {
  modal(image,name){
    
    swal({
      icon: image,
      title: "Whos that pokemon?",
      text: "It's "+name,
      button: "Goddamn",
    });
  }

  render() {
    const pokemon = this.props.pokemons.find((pokemon) => pokemon.id === parseInt(this.props.match.params.id, 10))
    return (
      <React.Fragment>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image_url}/>
        <p>ID: {pokemon.id}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Type(s): {pokemon.types.join(', ')}</p>
        {this.modal(pokemon.image_url,pokemon.name)}
      </React.Fragment>
    );
  }
}

export default withRouter(PokemonDetail);