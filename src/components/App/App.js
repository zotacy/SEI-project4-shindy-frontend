import React, {Component} from 'react';
import axios from 'axios'
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const backendUrl = "http://localhost:3001/api"

class App extends Component {
  constructor(){
    super()
    this.state ={
      characters: []
    }
  }

  componentDidMount = ()=>{
    this.getCharacters()
  }
  getCharacters = async()=>{
    const response = await axios(`${backendUrl}/characters`)
    this.setState({
      characters: response.data.allCharacters
    })
  }

  addCharacter = async(event)=>{ //add event because it is connected to a form
    event.preventDefault()
    await axios.post(`${backendUrl}/characters`,{
      name: event.target.name.value
    })
    this.getCharacters()
  }
  updateCharacter = async(event)=>{
    event.preventDefault()
    let characterId = event.target.characterId.value
    await axios.put(`${backendUrl}/characters/${characterId}`,{
      name: event.target.name.value,
      characterId: characterId
    })
    this.getCharacters()
  }
  deleteCharacter = async(event)=>{
    event.preventDefault()
    let characterId = event.target.id
    await axios.delete(`${backendUrl}/characters/${characterId}`)
    this.getCharacters()
  }

  render(){
    return (
      <div className="App">
      {/* Header */}
        <header className="header">
          <Header/>
        </header>
      {/* Main Body */}
        <main className="App-main">
          
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
