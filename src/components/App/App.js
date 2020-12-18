import React, {Component} from 'react';
import axios from 'axios';
// import bootstrap from 'bootstrap';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import PlayerProfile from '../PlayerProfile/PlayerProfile';
import Aheader from '../Aheader/Header';
import Afooter from '../Afooter/Footer';
import Login from '../PlayerLogin/Login';
import Signup from '../PlayerLogin/Signup';
import GameScreen from '../GameScreen/Game';
import Game from '../GameScreen/GameV1';

// const shindyBackendUrl = "http://localhost:3001/api"
const shindyBackendUrl = "https://shindy-api.herokuapp.com/"

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      user:{},
      primaryCharacter:{},
      userId: null,
      loggedIn:false
    }
  }
  // Methods: Get/Mount Profile
  componentDidMount=()=>{
    this.getProfile()
    localStorage.setItem('userInfo', this.state.user);
  }
  getProfile= async()=>{
    const response = await axios(`${shindyBackendUrl}/users/profile/${this.state.userId}`)
    this.setState({user:response.data.user})
    // localStorage.getItem('userInfo');
  }
  // Methods: PLayer Authentication (Login, Signup, Logout)
  signup= async(event)=>{
    event.preventDefault()
    let response = await axios.post(`${shindyBackendUrl}/auth/signup`,{
      name: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
    })
    console.log(response.data)
    this.setState({
      userId: response.data.userId,
      loggedIn: true
    })
    // Adds Inital Character for Player
    await axios.post(`${shindyBackendUrl}/chars`,{
      name:`${event.target.username.value} Knight`,
      hp: 100,
      attack: 25,
      defense: 5,
      recover: 10,
      spd: 1,
      userId: response.data.userId,
    })
    this.getProfile()
  }
  login= async(event)=>{
    event.preventDefault()
    let response = await axios.post(`${shindyBackendUrl}/auth/login`,{
      username: event.target.username.value,
      password: event.target.password.value
    })
    this.setState({
      userId: response.data.userId,
      loggedIn: true
    })
    this.getProfile()
  }
  logout= async(event)=>{
    event.preventDefault()
    await axios.get(`${shindyBackendUrl}/auth/logout`)
    this.setState({
      // user:{},
      // userId: null,
      loggedIn:false
    })
    return <Redirect to="/"/>
  }
  // Methods: User Profile (Update, Delete)
  updateProfile = async(event)=>{
    event.preventDefault()
    let userId = this.state.userId
    let response = await axios.put(`${shindyBackendUrl}/users/${userId}`,{
      name: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
      userId: userId
    })
    console.log(userId, response)
    this.getProfile()
  }
  deleteProfile = async(event)=>{
    event.preventDefault()
    let userId = this.state.userId 
    console.log(userId)
    await axios.delete(`${shindyBackendUrl}/users/${userId}`)
    this.getProfile()
  }
  // Methods: User Characters (Add,Update,Delete)
  addCharacter = async(event)=>{ //add event because it is connected to a form
    event.preventDefault()
    await axios.post(`${shindyBackendUrl}/chars`,{
      name: event.target.name.value,
      hp: event.target.hp.value,
      attack: event.target.attack.value,
      defense: event.target.defense.value,
      recover: event.target.recover.value,
      spd: event.target.spd.value,
      userId: event.target.userId.value,
      // characterId: event.target.userId.value
    })
    this.getProfile()
  }
  updateCharacter = async(event)=>{
    event.preventDefault()
    let characterId = event.target.characterId.value
    await axios.put(`${shindyBackendUrl}/chars/${characterId}`,{
        // name: event.target.name.value,
        hp: event.target.hp.value,
        attack: event.target.attack.value,
        defense: event.target.defense.value,
        recover: event.target.recover.value,
        spd: event.target.spd.value,
        // userId: event.target.userId.value,
        characterId: characterId,
    })
    this.getProfile()
  }
  deleteCharacter = async(event)=>{
    event.preventDefault()
    let characterId = event.target.id
    console.log(characterId)
    await axios.delete(`${shindyBackendUrl}/chars/${characterId}`)
    this.getProfile()
  }
  // Render Pages
  render(){
    // console.log(this.state)
    return (
      <div className="App">
      {/* Header */}
        <header className="header">
        <Aheader {...this.state}{...this.props} logout={this.logout}/>
        </header>
      {/* Main Body */}
        <main className="main"> 
        <Switch>
            <Route exact path="/" component={(routerProps)=>
              <GameScreen {...routerProps}/>
            }/>
            <Route path="/shindy" component={(routerProps)=>
              <GameScreen {...routerProps}/>
            }/>
            <Route path="/login" component={(routerProps)=>
              <Login {...routerProps} userId={this.state.userId} login={this.login}/>
              // this.state.loggedIn ? <Redirect to={`/profile/${this.state.userId}`}/>
            }/>
            <Route path="/signup" component={(routerProps)=>
              <Signup {...routerProps} user={this.state.user} userId={this.state.userId} 
                signup={this.signup} login={this.login}/>}/>
            {/* In sign-up route use create character to build "Shindy Knight" for new profiles */}
            <Route path="/profile/:id" component={(routerProps)=>
              <PlayerProfile {...routerProps} {...this.state}
                addCharacter={this.addCharacter} updateCharacter={this.updateCharacter} deleteCharacter={this.deleteCharacter}
                logout={this.logout} updateProfile ={this.updateProfile} deleteProfile={this.deleteProfile}
              />
            }/>
            <Route path="/shindyplay" component={(routerProps)=>
              <Game {...routerProps}/>
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
