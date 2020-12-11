import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';

class Login extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.props.login}>
                    <input type="text" name="username" placeholder="Username"/><br/>
                    <input type="password" name="password" placeholder="*******"/><br/>
                
                    <input type="hidden" name="loggedIn" value="true"/><br/>
                    <input id="submit" type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Login;