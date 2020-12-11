import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Homepage from '../Homepage/Homepage'
import PlayerProfile from '../PlayerProfile/PlayerProfile';
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
      users: [],
      characters:[]
    }
  }
  // Methods: Get Users & Characters
  componentDidMount=()=>{
    this.getUsers()
    this.getCharacters()
  }
  getUsers= async()=>{
    const response = await axios(`${shindyBackendUrl}/users`)
    this.setState({
      users: response.data.allUsers
    })
  }
  getCharacters = async()=>{
    const response = await axios(`${shindyBackendUrl}/chars`)
    this.setState({
      characters: response.data.allCharacters
    })
}
  // Methods: User Login & Signup
  signup=(event)=>{
    event.preventDefault()

    this.getUsers()
  }
  login=(event)=>{
    event.preventDefault()

    this.getUsers()
  }
  // Methods: User Profile
  logout=(event)=>{
    event.preventDefault()

    this.getUsers()
  }
  updateProfile = async(event)=>{
    event.preventDefault()
    let userId = event.target.userId.value
    await axios.put(`${shindyBackendUrl}/users/${userId}`,{
        name: event.target.name.value,
        userId: userId
    })
    this.getUsers()
  }
  deleteProfile = async(event)=>{
      event.preventDefault()
      let userId = event.target.id
      await axios.delete(`${shindyBackendUrl}/users/${userId}`)
      this.getUsers()
  }
  // Methods: User Characters
  addCharacter = async(event)=>{ //add event because it is connected to a form
      event.preventDefault()
      await axios.post(`${shindyBackendUrl}/characters`,{
          name: event.target.name.value
      })
      this.getCharacters()
  }
  updateCharacter = async(event)=>{
      event.preventDefault()
      let characterId = event.target.characterId.value
      await axios.put(`${shindyBackendUrl}/characters/${characterId}`,{
          name: event.target.name.value,
          characterId: characterId
      })
      this.getCharacters()
  }
  deleteCharacter = async(event)=>{
      event.preventDefault()
      let characterId = event.target.id
      await axios.delete(`${shindyBackendUrl}/characters/${characterId}`)
      this.getCharacters()
  }

  // Render Pages
  render(){
    // console.log(this.state)
    return (
      <div className="App">
      {/* Header */}
        <header className="header">
          <Aheader/>
        </header>
      {/* Main Body */}
        <main className="App-main"> 
          <Switch>
            <Route exact path="/" component={()=>
              <Homepage users={this.state.users} characters={this.state.characters}/>
            }/>
            <Route path="/gamescreen" component={()=><GameScreen/>}/>
            <Route path="/login" component={()=><Login users={this.state.users} login={this.login}/>}/>
            <Route path="/signup" component={()=><Signup users={this.state.users} signup={this.signup}/>}/>
            <Route path="/user/:id" component={()=>
              <PlayerProfile users={this.state.users} characters={this.state.characters}
                             addCharacter={this.addCharacter} updateCharacter={this.updateCharacter} deleteCharacter={this.deleteCharacter}
                             logout={this.logout} updateProfile ={this.updateProfile} deleteProfile={this.deleteProfile}
              />
            }/>
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
