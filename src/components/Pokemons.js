import React from 'react';
import swal from 'sweetalert';
import Axios from 'axios';
import { findByLabelText } from '@testing-library/react';

const Pokes = ({ pokes, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  return (   
    <div className="container"> 
        <div className="row">
            {pokes.map((pokemon,index) => {              
                return(
                    <div key={index} className="col-sm-2"><img onClick={() => pokemonDetails(pokemon.url)}className="img-fluid" src={getPic(pokemon)}></img>{pokemon.name}</div>
                );                
            })}
        </div>             
    </div>
  );
};

function pokemonDetails(link) {
    alertSuccess("Details","U clickd details m8","Ok!");
}
  
function alertSuccess(title,text,buttonText){
    swal({
        title: title,
        text: text,
        icon: "success",
        button: buttonText,
    });
}


function getPic(pokemon){ 
    
    let url = pokemon.url;
    let id;
    id = url.split("/").slice(-2)[0];
    return "https://pokeres.bastionbot.org/images/pokemon/"+id+".png";
}

export default Pokes;