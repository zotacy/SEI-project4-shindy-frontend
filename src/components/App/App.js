import React, {Component} from 'react';
import axios from 'axios'
import {Route, Switch, Redirect} from 'react-router-dom';
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
      user:{},
      userId: null,
      loggedIn:false
    }
  }
  // Methods: Get Profile
  componentDidMount=()=>{
    this.getProfile()
  }
  getProfile= async()=>{
    const response = await axios(`${shindyBackendUrl}/users/profile/${this.state.userId}`)
    this.setState({user:response.data.user})
  }
  // Methods: PLayer Login/Sign-up
  signup= async(event)=>{
    event.preventDefault()
    await axios.post(`${shindyBackendUrl}/auth/signup`,{
      name: event.target.name.value,
      email: event.target.name.value,
      username: event.target.name.value,
      password: event.target.password.value,
    })
    this.getProfile()
  }
  login= async(event)=>{
    event.preventDefault()
    let response = await axios.post(`${shindyBackendUrl}/auth/login`,{
      username: event.target.username.value,
      password: event.target.password.value
    })
    console.log(response.data.userId)
    this.setState({
      userId: response.data.userId,
      loggedIn: true
    })
    this.getProfile()
  }
  // Methods: User Profile
  logout=(event)=>{
    event.preventDefault()

    this.setState({
      loggedIn: false
    })
    this.getProfile()
  }
  updateProfile = async(event)=>{
    event.preventDefault()
    let userId = event.target.userId.value
    await axios.put(`${shindyBackendUrl}/users/${userId}`,{
      name: event.target.name.value,
      username: event.target.username.value,
      password: event.target.password.value,
      userId: userId
    })
    this.getProfile()
  }
  deleteProfile = async(event)=>{
      event.preventDefault()
      let userId = event.target.id
      await axios.delete(`${shindyBackendUrl}/users/${userId}`)
      this.getProfile()
  }
  // Methods: User Characters
  addCharacter = async(event)=>{ //add event because it is connected to a form
      event.preventDefault()
      await axios.post(`${shindyBackendUrl}/characters`,{
        name: event.target.name.value,
        hp: event.target.hp.value,
        attack: event.target.attack.value,
        defense: event.target.defense.value,
        recover: event.target.recover.value,
        spd: event.target.spd.value,
        userId: event.target.userId.value
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
          <Aheader userId={this.state.userId}/>
        </header>
      {/* Main Body */}
        <main className="App-main"> 
          <Switch>
            <Route exact path="/" component={()=>
              <Homepage user={this.state.user}/>
            }/>
            <Route path="/gamescreen" component={(routerProps)=><GameScreen/>}/>
            <Route path="/login" component={(routerProps)=>
              <Login {...routerProps} userId={this.state.userId} login={this.login}/>
              // this.state.loggedIn ? <Redirect to={`/profile/${this.state.userId}`}/>
            }/>
            <Route path="/signup" component={(routerProps)=>
              <Signup {...routerProps} user={this.state.user} signup={this.signup}/>}/>
            <Route path="/users/:id" component={(routerProps)=>
              <PlayerProfile user={this.state.user} characters={this.state.characters}
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
