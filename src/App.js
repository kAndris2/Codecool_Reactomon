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
      pokesPerPage: 20,
      currentPage: 1,

    }

    this.handlePokemonListResponse = this.handlePokemonListResponse.bind(this);
    this.handlePokemonDetailsResponse = this.handlePokemonDetailsResponse.bind(this);
    this.handleGetPrev20 = this.handleGetPrev20.bind(this);
    this.handleGetNext20 = this.handleGetNext20.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);

    
  }
  //teszt
  getStuff(){
    // const indexOfLastPokes = this.state.currentPage * this.state.pokesPerPage;
    // const indexOfFirstPokes = indexOfLastPokes - this.state.pokesPerPage;
    // const currentPokes = this.state.pokemons.slice(indexOfFirstPokes, indexOfLastPokes);
    //return "asd";
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

  handleGetNext20() {
    const offset = this.state.offset + 20;
    this.fetchPokemons(offset);
    this.setState({offset});
  }

  handleGetPrev20() {
    const offset = this.state.offset - 20;
    this.fetchPokemons(offset);
    this.setState({offset});
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
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/pokemons">Pokemons</Link>
              </li>
              <li>
                <Link to="/types">Types</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Redirect exact from="/" to="/pokemons" />
            <Route exact path="/pokemons">
              <PokemonList offset={this.state.offset}
                           pokemons={currentPokes}
                           getPrev20={this.handleGetPrev20}
                           getNext20={this.handleGetNext20}/>
              <Pagination
                pokesPerPage={this.state.pokesPerPage}
                totalPokes={this.state.pokemons.length}
                paginate={paginate}
              />
            </Route>
            <Route exact path="/types">
              <TypeList />
            </Route>
            <Route path="/pokemons/:id" children={<PokemonDetail pokemons={this.state.pokemons}/>} />
          </Switch>
        </Router>
      );
    } else {
      return <h1>Loading...</h1>
    }
  }
}

export default App;
