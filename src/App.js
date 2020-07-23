import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import PokemonDetail from './PokemonDetail';
import Pagination from './Pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      offset: 0,
      pokemons: [],
      pokesPerPage: 15,
      currentPage: 1,

    }

    this.handlePokemonListResponse = this.handlePokemonListResponse.bind(this);
    this.handlePokemonDetailsResponse = this.handlePokemonDetailsResponse.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);

    
  }

  toPokemon(response) {
    let typeList = [];
    response.data.types.forEach(slot => {
      typeList.push(slot.type.name);
    });

    return {
      id: response.data.id,
      name: response.data.name,
      image_url: response.data.sprites.front_default,
      weight: response.data.weight,
      types: typeList
    };
  }

  handlePokemonDetailsResponse(responses) {
    this.setState({
      loaded: true,
      pokemons: responses.map(this.toPokemon)
    });
  }

  handlePokemonListResponse(response) {
    Promise.all(response.data.results.map((pokemon) => axios.get(pokemon.url)))
      .then(this.handlePokemonDetailsResponse)
  }

  componentDidMount() {
    this.fetchPokemons(0);
  }

  fetchPokemons(offset) {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=200`).then(this.handlePokemonListResponse)
  }

  setCurrentPage(number){
    this.setState({
      currentPage: number
    })
  }
  render() {
    if (this.state.loaded) {
      const paginate = pageNumber => this.setCurrentPage(pageNumber);
      const indexOfLastPokes = this.state.currentPage * this.state.pokesPerPage;
      const indexOfFirstPokes = indexOfLastPokes - this.state.pokesPerPage;
      const currentPokes = this.state.pokemons.slice(indexOfFirstPokes, indexOfLastPokes);
      return (
        <div className="container">
          <Router>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active h4" id="pokemons-tab" data-toggle="tab" href="#pokemons" role="tab" aria-controls="pokemons" aria-selected="true">Pokemons</a>
            </li>

            <li className="nav-item">
              <a className="nav-link h4" id="types-tab" data-toggle="tab" href="#types" role="tab" aria-controls="types" aria-selected="false">Types</a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="pokemons" role="tabpanel" aria-labelledby="pokemons-tab">
              <PokemonList pokemons={currentPokes}/>
              <Pagination
                pokesPerPage={this.state.pokesPerPage}
                totalPokes={this.state.pokemons.length}
                paginate={paginate}
              />
              <Route path="/pokemons/:id" children={<PokemonDetail pokemons={this.state.pokemons}/>} />
            </div>

            <div className="tab-pane fade" id="types" role="tabpanel" aria-labelledby="types-tab">
              <TypeList />
            </div>
          </div>
            <Switch>
              <Redirect exact from="/" to="/pokemons" />
              <Route exact path="/pokemons">
                
              </Route>
              <Route exact path="/types">
                
              </Route>
              
            </Switch>
          </Router>
        </div>
      );
    } else {
      return <h1>Tőtök</h1>
    }
  }
}

export default App;
