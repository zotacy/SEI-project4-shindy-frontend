import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Homepage from '../Homepage/Homepage'
import Aheader from '../Aheader/Header';
import Afooter from '../Afooter/Footer';
import Login from '../PlayerLogin/Login';
import Signup from '../PlayerLogin/Signup';
import GameScreen from '../GameScreen/GameScreen';

const shindyBackendUrl = "http://localhost:3001/api"

class App extends Component {
  constructor(){
    super()
    this.state ={
      users: []
    }
  }
  // Methods: Get Users & assign to this.state
  componentDidMount=()=>{
    this.getUsers()
  }
  getUsers= async()=>{
    const response = await axios(`${shindyBackendUrl}/users`)
    this.setState({
      users: response.data.allUsers
    })
  }
  // Methods: Signup, Login, Logout
  signup=(event)=>{
    event.preventDefault()

    this.getUsers()
  }
  login=(event)=>{
    event.preventDefault()

    this.getUsers()
  }
  logout=(event)=>{
    event.preventDefault()

    this.getUsers()
  }

  // Render Pages
  render(){
    return (
      <div className="App">
      {/* Header */}
        <header className="header">
          <Aheader/>
        </header>
      {/* Main Body */}
        <main className="App-main"> 
          <Switch>
            <Route exact path="/" component={()=><Homepage/>}/>
            <Route path="/gamescreen" component={()=><GameScreen/>}/>
            <Route path="/login" component={()=><Login/>}/>
            <Route path="/signup" component={()=><Signup/>}/>
          </Switch>
        </main>
      {/* Footer */}
        <footer className="footer">
          <Afooter/>
        </footer>
      </div>
    );
  }
}

export default App;
