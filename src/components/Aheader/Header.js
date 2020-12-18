import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

class Header extends Component{
    handleLogout=async(event)=>{
        event.preventDefault();
        await this.props.logout(event)
        // setTimeout(()=>{
        //   this.props.history.push(`/shindy`)
        // },500)
      }
    render(){
        if (this.props.loggedIn === true) {
            return(
                <header className="App-header">
                    <Link to="/shindy"><h1 id="header-link">Shindy</h1></Link>   
                    <Link to={`/profile/${this.props.userId}`}><h3> {this.props.user.username}'s Profile</h3></Link>
                    <Link to="/shindy"><button onClick={this.handleLogout}>Log out</button></Link>  
                    {/* <Link to='/shindyplay'>Play Alt</Link>                  */}
                </header>
            )
        } else {
            return(
                <header className="App-header">
                    <Link to="/shindy"><h1 id="header-link">Shindy</h1></Link>  
                    <div className="buttonContainer">
                        <Link to="/login"><button>Login</button></Link>
                        <Link to="/signup"><button>Signup</button></Link>    
                    </div> 
                    {/* <Link to='/shindyplay'>Play Alt</Link>                 */}
                </header>
            )
        }
    }
}

export default Header;

