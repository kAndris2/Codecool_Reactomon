import React from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {lightDiv, darkDiv} from './theme';

class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      newArr: [],
      totve: false,
      thm: this.props.theme
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

  getRows(pokemonsperrow, pokemons){
    let items = pokemons;
    let n = pokemonsperrow //popkes per row

    let result = new Array(Math.ceil(items.length / n))
    .fill()
    .map(_ => items.splice(0, n));

    this.setState({newArr: result,totve:true});
  }

  componentDidMount(){
    this.getRows(5,this.props.pokemons);
  
  }
  caughtPokemon(pokemon) {
    return this.props.caught.includes(pokemon);
  }

  render() {
    if (this.state.totve){
      if (this.props.pokemons.length > 0){
        this.getRows(5,this.props.pokemons);
      }
      
      return (
        <React.Fragment>
          <div className="card-deck">
            {this.state.newArr[0].map(this.mapPokemonToTableRow)}
          </div>
          <div className="card-deck">
            {this.state.newArr[1].map(this.mapPokemonToTableRow)}
          </div>
          <div className="card-deck">
            {this.state.newArr[2].map(this.mapPokemonToTableRow)}
          </div>
        </React.Fragment>
      );
    }
    else {
      return <h1>Tőtök</h1>
    }
  }

  mapPokemonToTableRow(pokemon) {
    return (
    
      <div className="card" key={pokemon.id} style={this.props.theme == 'light' ? lightDiv : darkDiv}>
        <img className="card-img-top" src={`${pokemon.image_url}`} alt="Card image cap"></img>
          <div className="card-body">
            {pokemon.name}
        
            <p>
              <Link to={`/pokemons/${pokemon.id}`}>
                Details
              </Link>
            </p>

            {this.caughtPokemon(pokemon) == true ? <h6><b><u>Caught!</u></b></h6> : <button onClick={() => this.catchPokemon(pokemon)}>Catch!</button>}
          </div>
      </div>
    )
  }
}

export default PokemonList;