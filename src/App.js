import React, { useState } from 'react';
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
import Caught from './Caught';
import Error from './Error';
import Pagination from './Pagination';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      offset: 0,
      pokemons: [],
      pokesPerPage: 15,
      currentPage: 1,
      theme: 'light',
      caught: [],
      inputState: undefined,
      search: undefined
    }

    this.handlePokemonListResponse = this.handlePokemonListResponse.bind(this);
    this.handlePokemonDetailsResponse = this.handlePokemonDetailsResponse.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  getSearchResult() {
    const pokemon = isNaN(this.state.search) == false ? 
      this.state.pokemons.find((pokemon) => pokemon.id == this.state.search)
      :
      this.state.pokemons.find((pokemon) => pokemon.name === this.state.search);

    if (pokemon != undefined) {
      let route = `/pokemons/${pokemon.id}`;
      return (
        <Redirect to={route} />
      );
    }
    else {
      return (
        <Redirect to="/error" />
      );
    }
  }

  toggleTheme() {
    this.state.theme === 'light' ? this.setState({theme: 'dark'}) : this.setState({theme: 'light'});
  }

  toPokemon(response) {
    let typeList = [];
    response.data.types.forEach(slot => {
      typeList.push(slot.type.name);
    });

    let movesList = [];
    response.data.moves.forEach(item => {
      movesList.push(item.move.name);
    });

    let abilityList = [];
    response.data.abilities.forEach(item => {
      abilityList.push(item.ability.name);
    })

    return {
      id: response.data.id,
      name: response.data.name,
      image_url: response.data.sprites.front_default,
      back_image_url: response.data.sprites.back_default,
      weight: response.data.weight,
      height: response.data.height,
      types: typeList,
      abilities: abilityList,
      moves: movesList
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
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300`).then(this.handlePokemonListResponse)
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
          <div class="row">
              <div class="col-sm-6">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active h5" id="pokemons-tab" aria-selected="true">
                      <Link to="/pokemons">Pokemons</Link>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link h5" id="types-tab" aria-selected="false">
                      <Link to="/types">Types</Link>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link h5" id="types-tab" aria-selected="false">
                      <Link to="/caught">Caught</Link>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6">
              

              <form className="form-inline">
              <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
                <>
                  <GlobalStyles />
                  <div class="theme-switch-wrapper">
                    <label class="theme-switch" for="checkbox">
                        <input onClick={this.toggleTheme} type="checkbox" id="checkbox" />
                        <div class="slider round"></div>
                    </label>
                    <em>Enable Dark Mode!</em>
                  </div>
    
                </>
              </ThemeProvider>
                <div className="form-group mx-sm-3 mb-2">
                  <input onChange={(event) => {this.setState({inputState: event.target.value})}} placeholder="Enter your pokemon name" type="text" class="form-control" />
                </div>
              </form>
                <button onClick={() => {this.setState({search: this.state.inputState})}}class="btn btn-primary mb-2">Get</button>
              </div>
          </div>
          
            

              

           

            {this.state.search != undefined ? this.getSearchResult() : undefined}

            <Switch>
              <Redirect exact from="/" to="/pokemons" />

              <Route exact path="/pokemons">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="pokemons" role="tabpanel" aria-labelledby="pokemons-tab">
                    <PokemonList 
                      pokemons={currentPokes} 
                      caught={this.state.caught}
                      theme={this.state.theme}
                    />
                    <Pagination
                      pokesPerPage={this.state.pokesPerPage}
                      totalPokes={this.state.pokemons.length}
                      paginate={paginate}
                    />
                  </div>

                  <div className="tab-pane fade" id="types" role="tabpanel" aria-labelledby="types-tab">
                    <TypeList />
                  </div>
                </div>
              </Route>

              <Route exact path="/types">
                <TypeList theme={this.state.theme}/>
              </Route>

              <Route exact path="/caught">
                <Caught pokemons={this.state.caught} theme={this.state.theme} />
              </Route>

              <Route exact path="/error">
                <Error search={this.state.search} theme={this.state.theme}/>
              </Route>

              <Route path="/pokemons/:id" children={<PokemonDetail pokemons={this.state.pokemons} caught={this.state.caught} theme={this.state.theme}/>} />

            </Switch>
          </Router>

          <video
            autoPlay={true} 
            loop={true}
            muted
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "120%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1"
            }}
          >
            <source src="https://r2---sn-c0q7lnsl.googlevideo.com/videoplayback?expire=1596635349&ei=dWQqX6KfDdXoyAWt-5rABQ&ip=2a0b:1587:e8a4:f376:6618:3784:e093:8c10&id=o-AG5sunQn1fKSfz6CjnjYviPI4GBszFhUljf9Ab5EP7h_&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video/mp4&gir=yes&clen=4608324&ratebypass=yes&dur=60.209&lmt=1575871229256498&fvip=18&fexp=23883098&c=WEB&txp=5431432&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,gir,clen,ratebypass,dur,lmt&sig=AOq0QJ8wRQIgVPgx8I7HtLiGaByTimQJbUWOure--2IN0v0eeq_uPI0CIQDnr5cZTMkAoaiS_vnzg4Mo2tW_z_BV4znLb2ISuWRoJQ==&title=Pok%C3%A9mon%20Season%201:%20Indigo%20-VideoIndirelim.com&rm=sn-4pvgq-n8vs7d,sn-n8vkzer&req_id=d09dd823c37fa3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=o6&mip=2001:4c4e:1a06:e681:92b:af1f:888b:241c&mm=29&mn=sn-c0q7lnsl&ms=rdu&mt=1596613657&mv=m&mvi=3&pl=30&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgDI8IQyv-yTrySvUKx2nSYAPXW4oeax74wPQVmlZO9n4CIByFHU68nYERn8GsmBMPCEFw_FSjNAa24Xqd2PMZAgSX&ir=1&rr=12" />
          </video>

        </div>
      );
    } else {
      return(
        <div className="container text-center align-middle">
          <img src="https://flipanim.com/gif/9/c/9czwuOXy.gif"></img>
        </div>
      );
    }
  }
}

export default App;
