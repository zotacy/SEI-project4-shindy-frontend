import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Forms.css';

class Signup extends Component{
    render(){
      const allUsers = this.props.users;
      
        return(
          <main class="newUser">
            <h1> Create new account</h1>
            {/* <!-- Sign-up Info --> */}
            <form>
                <input type="text" name="name" placeholder="Full Name"/><br/>
                <input type="text" name="email" placeholder="Email"/><br/>
                <input type="text" name="username" placeholder="Username"/><br/>
                <input type="text" name="password" placeholder="*******"/><br/>
            
                <input type="hidden" name="loggedIn" value="true"/><br/>
            {/* <!-- Submit button --> */}
            <input id="submit"  type="submit" value="Signup" />
            </form>
          </main>
        )
    }
}

export default Signup;