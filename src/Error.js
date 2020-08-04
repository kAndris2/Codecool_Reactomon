import React from 'react';
import {lightDiv, darkDiv} from './theme';

class Error extends React.Component {
    render() {
        return (
            <>
                <div style={this.props.theme == 'light' ? lightDiv : darkDiv}>
                    <h1 style={{textAlign: 'center'}}>
                        Cannot find 
                        '{isNaN(this.props.search) == false ? `ID: ${this.props.search}` : this.props.search}'!
                    </h1>
                    <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="https://i.kym-cdn.com/photos/images/original/000/965/245/995.gif" />
                </div>
            </>
        );
    }
}

export default Error;