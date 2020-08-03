import React from 'react';
import { withRouter, Redirect } from "react-router";
import swal from 'sweetalert'
import {Route} from 'react-router-dom';
import { Link } from "react-router-dom";

class PokemonDetail extends React.Component {
  render() {
    const pokemon = this.props.pokemons.find((pokemon) => pokemon.id === parseInt(this.props.match.params.id, 10))
    console.log(this.props);
    return (
      <>
        <div className="container-fluid">
          <img src={pokemon.image_url} />
          <h1>{pokemon.name}</h1>
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
        <Link to="/">Back</Link>
      </>
    );
  }
}

export default withRouter(PokemonDetail);