import React, {Component} from 'react';
import './Forms.css';

class Signup extends Component{
  handleSignup=async(event)=>{
    event.preventDefault();
    console.log(event)
    await this.props.signup(event)
    await this.props.login(event)
    setTimeout(()=>{
      this.props.history.push(`/profile/${this.props.userId}`)
    },500)
  }
  render(){  
    return(
      <div>
        <h1> Create new account</h1>
        {/* <!-- Sign-up Info --> */}
        <form onSubmit={this.handleSignup}>
          <input type="text" name="name" placeholder="Full Name"/><br/>
          <input type="text" name="email" placeholder="Email"/><br/>
          <input type="text" name="username" placeholder="Username"/><br/>
          <input type="password" name="password" placeholder="*******"/><br/>
      
          <input type="hidden" name="loggedIn" value="true"/><br/>
        {/* <!-- Submit button --> */}
          <input id="submit"  type="submit" value="Signup" />
        </form>
      </div>
    )
  }
}

export default Signup;