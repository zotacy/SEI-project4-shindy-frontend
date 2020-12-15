import React, {Component} from 'react';
import './Forms.css';

class Login extends Component{
    handleLogin=async(event)=>{
        event.preventDefault();
        await this.props.login(event)
        setTimeout(()=>{
            this.props.history.push(`/profile/${this.props.userId}`)
        },500)
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleLogin}>
                    <input type="text" name="username" placeholder="Username"/><br/>
                    <input type="password" name="password" placeholder="*******"/><br/> 
                        {/* Error message when this is type=password */}
                    <input type="hidden" name="loggedIn" value="true"/><br/>
                    <input id="submit" type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default Login;