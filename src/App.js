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
      caught: []
    }

    this.handlePokemonListResponse = this.handlePokemonListResponse.bind(this);
    this.handlePokemonDetailsResponse = this.handlePokemonDetailsResponse.bind(this);
    this.fetchPokemons = this.fetchPokemons.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.state.theme === 'light' ? this.setState({theme: 'dark'}) : this.setState({theme: 'light'});
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
                <a className="nav-link active h4" id="pokemons-tab" aria-selected="true">
                  <Link to="/pokemons">Pokemons</Link>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link h4" id="types-tab" aria-selected="false">
                  <Link to="/types">Types</Link>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link h4" id="types-tab" aria-selected="false">
                  <Link to="/caught">Caught</Link>
                </a>
              </li>

              <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
                <>
                  <GlobalStyles />
                  <button onClick={this.toggleTheme}>Toggle theme</button>
                  <footer>
                  </footer>
                </>
              </ThemeProvider>

            </ul>

            <Switch>
              <Redirect exact from="/" to="/pokemons" />

              <Route exact path="/pokemons">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="pokemons" role="tabpanel" aria-labelledby="pokemons-tab">
                    <PokemonList pokemons={currentPokes} caught={this.state.caught}/>
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
                <TypeList />
              </Route>

              <Route exact path="/caught">
                <Caught pokemons={this.state.caught} />
              </Route>

              <Route path="/pokemons/:id" children={<PokemonDetail pokemons={this.state.pokemons} caught={this.state.caught}/>} />

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
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1"
            }}
          >
            <source src="https://r2---sn-c0q7lnsl.googlevideo.com/videoplayback?expire=1596561008&ei=EEIpX-qANoT5yQX0kI6oBQ&ip=2a06:c006:35a9:a4ff:22bd:661e:5f75:b4fa&id=o-AJv4thrydxyTTlT1kwG6PN48QHtesjic7a7kVEGwJNjD&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video/mp4&gir=yes&clen=4608324&ratebypass=yes&dur=60.209&lmt=1575871229256498&fvip=18&fexp=23883098&c=WEB&txp=5431432&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,gir,clen,ratebypass,dur,lmt&sig=AOq0QJ8wRAIgBlfjivEqm_0ef35ZdV0xieTovR6aW7EQCvMd4xfVPtMCIB3pbCYjj_YELB5Ye75ufgp2SExqkGOmuq1NAPBaOvHP&title=Pok%C3%A9mon%20Season%201:%20Indigo%20-VideoIndirelim.com&rm=sn-4pvgq-n8vs7d,sn-n8vrser&req_id=92123e29e91fa3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=o6&mip=2001:4c4e:1a14:bad:191c:4f8b:507f:f142&mm=29&mn=sn-c0q7lnsl&ms=rdu&mt=1596539286&mv=m&mvi=3&pl=30&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgWBsn-zW3evhhAhWNPhUbbDdm05l5iLEpfo5-lcBbq7kCIQCKvl2GOEQk0jjCMxrKrOvs3btxj9N4fQvSBzyKXeiyqQ%3D%3D&ir=1&rr=12" />
          </video>

        </div>
      );
    } else {
      return <h1>Tőtök</h1>
    }
  }
}

export default App;
