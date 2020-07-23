import React from 'react';
import { withRouter, Redirect } from "react-router";
import swal from 'sweetalert'
import {Route} from 'react-router-dom';

class PokemonDetail extends React.Component {
  modal(image,name,id,weight,type){
    const content = document.createElement("div");
    content.className="container-fluid";
    content.innerHTML = 
    `<table class="table table-hover table-striped">
        <tr>
          <td class="font-weight-bold">ID:</td>
          <td>${id}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Weight</td>
          <td>${weight}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Type(s)</td>
          <td>${type}</td>
        </tr>  
     </table>`;
    
    swal({
      icon: image,
      title: "Whos that pokemon?",
      text: "It's "+name,
      button: "Goddamn",
      content,
    })
    .then((clicked) => {
      if (clicked) {
        // window.history.pushState("object or string", "Title", "/pokemons");
      }
    });
  }

  render() {
    const pokemon = this.props.pokemons.find((pokemon) => pokemon.id === parseInt(this.props.match.params.id, 10))
    return (
      <React.Fragment>
        {this.modal(pokemon.image_url,pokemon.name,pokemon.id,pokemon.weight,pokemon.types.join(', '))}
      </React.Fragment>
    );
  }
}

export default withRouter(PokemonDetail);