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
                {this.props.pokemons.length >= 1 ? this.props.pokemons.map(this.mapCaughtPokemons) : <h6>You haven't caught a pokemon yet!</h6>}
            </>
        );
    }
}

export default Caught;