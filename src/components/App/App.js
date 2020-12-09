import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
          <Header/>
        </header>
      {/* Main Body */}
        <main className="App-main">
          <Switch>
            <Route path="/gamescreen" component={()=>
              <GameScreen/>
            }/>
          </Switch>
        </main>
      {/* Footer */}
        <footer className="footer">
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
