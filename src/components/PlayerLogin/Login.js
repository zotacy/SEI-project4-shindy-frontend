import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';

class Login extends Component{
    constructor(){
        super()
    }
    render(){
        const allUsers = this.props.users;
        console.log(allUsers)
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.props.login()}>
                <input type="text" name="username" placeholder="Username"/><br/>
                <input type="password" name="password" placeholder="*******"/><br/>
            
                <input type="hidden" name="loggedIn" value="true"/><br/>
                <Link to={`/users/:id`}><input id="submit" type="submit" value="Login"/></Link>
            </form>
            </div>
        )
    }
}

export default Login;