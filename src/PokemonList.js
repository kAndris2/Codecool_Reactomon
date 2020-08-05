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

  getRows(pokemonsperrow){
    let items = [...this.props.pokemons];
    let n = pokemonsperrow //popkes per row
    let result = new Array(Math.ceil(items.length / n))
    .fill() 
    .map(_ => items.splice(0, n));
    
    this.setState({newArr: result, totve:true});
  }

  componentDidMount(){
    this.getRows(5);
  
  }
  caughtPokemon(pokemon) {
    return this.props.caught.includes(pokemon);
  }

  render() {
    if (this.state.totve){
      
      if (this.props.pokemons[0] !== this.state.newArr[0][0]){
        this.getRows(5);
      }

      if (this.state.newArr.length === 0){
        this.getRows(5);
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

        <Link to={`/pokemons/${pokemon.id}`}>
          <img className="card-img-top" src={`${pokemon.image_url}`} alt="Card image cap"></img>
          <div className="text-center">{pokemon.name}</div>
        </Link>

          <div className="card-body text-center">
            {this.caughtPokemon(pokemon) == true ? 
              <img width="35" height="35" src="https://png2.cleanpng.com/sh/c6b4887dd23f38dba4c5869c7ce9b164/L0KzQYm3U8I6N6NvfZH0aYP2gLBuTgRma5lzh954Z4mwcsPojvQua5p3e95uLYDye7bpgfxtNWZmetY6YUXnQoXsVcY5Nmo3T6YCMkm1QYa5UsM1OmUAS6MAMUGxgLBu/kisspng-technology-brand-circle-pokeball-5abd1a5d24e568.9274729215223424931511.png" />
              : 
              <button className="btn btn-secondary" onClick={() => this.catchPokemon(pokemon)}>Catch!</button>}
          </div>

      </div>
    )
  }
}

export default PokemonList;