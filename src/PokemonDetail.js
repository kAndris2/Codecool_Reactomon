import React from 'react';
import { withRouter, Redirect } from "react-router";
import swal from 'sweetalert'
import {Route} from 'react-router-dom';
import { Link } from "react-router-dom";

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

    this.catchPokemon = this.catchPokemon.bind(this);
    this.caughtPokemon = this.caughtPokemon.bind(this);
  }

  catchPokemon(pokemon) {
    this.setState({count: this.state.count + 1});
    this.props.caught.push(pokemon);
  }

  caughtPokemon(pokemon) {
    return this.props.caught.includes(pokemon);
  }

  render() {
    const pokemon = this.props.pokemons.find((pokemon) => pokemon.id === parseInt(this.props.match.params.id, 10))
    return (
      <>
        <div className="container-fluid">
          <img src={pokemon.image_url} />
          <h1>{pokemon.name}</h1>
          {this.caughtPokemon(pokemon) == true ? <h6>You're already own this pokemon!</h6> : <button onClick={() => this.catchPokemon(pokemon)}>Catch!</button>}

          <table class="table table-hover table-striped">

            <tr>
              <td class="font-weight-bold">ID:</td>
              <td>{pokemon.id}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Weight</td>
              <td>{pokemon.weight}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Type(s)</td>
              <td>{pokemon.types.join(', ')}</td>
            </tr>  

          </table>
        </div>
      </>
    );
  }
}

export default withRouter(PokemonDetail);