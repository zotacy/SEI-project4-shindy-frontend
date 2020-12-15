import React, {Component} from 'react';
import './Forms.css';

class Signup extends Component{
  render(){  
      return(
        <div>
          <h1> Create new account</h1>
          {/* <!-- Sign-up Info --> */}
          <form onSubmit={this.props.signup}>
            <input type="text" name="name" placeholder="Full Name"/><br/>
            <input type="text" name="email" placeholder="Email"/><br/>
            <input type="text" name="username" placeholder="Username"/><br/>
            <input type="text" name="password" placeholder="*******"/><br/>
        
            <input type="hidden" name="loggedIn" value="true"/><br/>
          {/* <!-- Submit button --> */}
            <input id="submit"  type="submit" value="Signup" />
          </form>
        </div>
      )
  }
}

export default Signup;