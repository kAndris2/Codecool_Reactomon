import React from 'react';
import {lightDiv, darkDiv} from './theme';
import { Redirect, Link } from 'react-router-dom';

class Caught extends React.Component {
    constructor(props) {
        super(props);

        this.mapRows = this.mapRows.bind(this);
        this.mapPokemons = this.mapPokemons.bind(this);
        this.countPokemons = this.countPokemons.bind(this);
        this.managePokemons = this.managePokemons.bind(this);
    }

    managePokemons(){
        let pokemons = this.props.pokemons;
        let n = 3;
    
        let result = new Array(Math.ceil(pokemons.length / n))
        .fill()
        .map(_ => pokemons.splice(0, n));
    
        return result;
      }

    countPokemons() {
        return this.props.pokemons.length;
    }

    mapRows(row) {
        return (
            <>
                <div className="row">
                    {row.map(this.mapPokemons)}
                </div>
            </>
        );
    }

    mapPokemons(pokemon) {
        const link = `/pokemons/${pokemon.id}`;
        return (
            <>
                <div className="col">
                    <Link to={link}>
                        <img src={pokemon.image_url}></img>
                        {pokemon.name}
                    </Link>
                </div>
            </>
        );
    }

    render () {
        if (this.countPokemons() >= 1) {
            return (
                <>
                    <div style={this.props.theme == 'light' ? lightDiv : darkDiv}>
                        {this.managePokemons().map(this.mapRows)}
                    </div>
                </>
            );
        }
        else {
            return (
                <h6>You haven't caught a pokemon yet!</h6>
            );
        }
    }
}

export default Caught;