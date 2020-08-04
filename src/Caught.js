import React from 'react';

class Caught extends React.Component {
    constructor(props) {
        super(props);

        this.mapCaughtPokemons = this.mapCaughtPokemons.bind(this);
    }

    mapCaughtPokemons(pokemon) {
        return (
            <h1>{pokemon.name}</h1>
        );
    }

    render () {
        return (
            <>
                {this.props.pokemons.map(this.mapCaughtPokemons)}
            </>
        );
    }
}

export default Caught;