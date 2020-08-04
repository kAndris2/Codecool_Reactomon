import React from 'react';
import axios from 'axios';
import {lightDiv, darkDiv} from './theme';

class TypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: []
    }
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/type')
      .then((response) => this.setState({types: response.data.results}))
  }

  render() {
    return (
      <React.Fragment>
        <div style={this.props.theme == 'light' ? lightDiv : darkDiv} >
          <h1><u>Types:</u></h1>
          <ul>
            {this.state.types.map(this.mapTypeToListItem)}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  mapTypeToListItem(type) {
    return (
      <li key={type.url}>
        {type.name}
      </li>
    )
  }
}

export default TypeList;
