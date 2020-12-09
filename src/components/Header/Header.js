import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

class Header extends Component{
    render(){
        return(
            <header className="App-header">
                <Link to ="/"><h1 id="header-link">Shindy</h1></Link>   
                <Link to="/gamescreen"><h3>Play</h3></Link>           
            </header>
        )
    }
}

export default Header;