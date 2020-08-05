import React from 'react';
import { withRouter, Redirect } from "react-router";
import swal from 'sweetalert'
import {Route} from 'react-router-dom';
import { Link } from "react-router-dom";
import {lightDiv, darkDiv, lightTable, darkTable} from './theme';

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

    this.catchPokemon = this.catchPokemon.bind(this);
    this.caughtPokemon = this.caughtPokemon.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
  }

  removeVideo(id) {
    const video = document.getElementById(id);
    video.style.display = "none";
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
    console.log(this.props);
    return (
      <>
        {this.state.count >= 1 ? 
        <video id="myVid" onEnded={() => this.removeVideo("myVid")} autoPlay={true} loop={false} src="https://thumbs.gfycat.com/IlliterateDistinctBass-mobile.mp4"></video>
        : undefined}

        <div className="container-fluid" style={this.props.theme == 'light' ? lightDiv : darkDiv}>
          <img src={pokemon.image_url} />
          <img src={pokemon.back_image_url} />
          <h1>{pokemon.name}</h1>
          {this.caughtPokemon(pokemon) == true ? <h6>You are already own this pokemon!</h6> : 
          <button onClick={() => this.catchPokemon(pokemon)}>Catch!</button>}

          <table class="table table-hover table-striped" style={this.props.theme == 'light' ? lightTable : darkTable}>

            <tr>
              <td class="font-weight-bold">ID:</td>
              <td>{pokemon.id}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Weight:</td>
              <td>{pokemon.weight}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Height:</td>
              <td>{pokemon.height}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Type(s):</td>
              <td>{pokemon.types.join(', ')}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Moves:</td>
              <td>{pokemon.moves.join(', ')}</td>
            </tr>  

          </table>
        </div>
      </>
    );
  }
}

export default withRouter(PokemonDetail);