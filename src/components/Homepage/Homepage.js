import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import './HomePage.css'

class HomePage extends Component{
    render(){
        return(
            <main className="App-main">
            <h1>Homepage</h1>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Signup</button></Link>                      
            </main>
        )
    }
}

export default HomePage;