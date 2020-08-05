import React from 'react';
import {lightDiv, darkDiv} from './theme';
import { Redirect, Link } from 'react-router-dom';

class Caught extends React.Component {
    constructor(props) {
        super(props);

        this.mapPokemons = this.mapPokemons.bind(this);
        this.countPokemons = this.countPokemons.bind(this);
    }

    countPokemons() {
        return this.props.pokemons.length;
    }

    mapPokemons(pokemon) {
        const link = `/pokemons/${pokemon.id}`;
        return (
            <>
                <div className="col">
                    <Link to={link}>
                        <img src={pokemon.image_url}></img>
                        <p>{pokemon.name}</p>
                    </Link>
                </div>
            </>
        );
    }
    
    render () {
        if (this.countPokemons() >= 1) {
            return (
                <>
                    <div className="row" style={this.props.theme == 'light' ? lightDiv : darkDiv}>
                        {this.props.pokemons.map(this.mapPokemons)}
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