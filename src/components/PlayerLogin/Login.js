import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';

class Login extends Component{
    render(){
        const allUsers = this.props.users;
        
        return(
            <div>
                <h1>Login</h1>
                <form>
                <input type="text" name="username" placeholder="Username"/><br/>
                <input type="text" name="password" placeholder="*******"/><br/>
            
                <input type="hidden" name="loggedIn" value="true"/><br/>
                <input id="submit"  type="submit" value="Login" />
            </form>
            </div>
        )
    }
}

export default Login;