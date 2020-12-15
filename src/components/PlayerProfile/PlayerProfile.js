import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './PlayerProfile.css';

class PlayerProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            name: '',
            email: '',
            username: '',
            password: '',
        }
    }
    handleChange=(event)=>{
        event.preventDefault()
        this.setState({
          [event.target.name]:event.target.value
        })
    }
    render(){
        const playerDetails= this.props.user;
        console.log(playerDetails)
        console.log(playerDetails.Characters)
        let characters= playerDetails.Characters.map((character,index)=>{
            return(
                <div className="characterInfo" key={index}>
                    <div>
                        <p id="charName">"{character.name}"</p>
                        <p id="hpStat">hp: {character.hp}</p>
                        <p id="atkStat">attack: {character.attack}</p>
                        <p id="defStat">defense: {character.defense}</p>
                        <p id="spdStat">spd: {character.spd}</p>
                    </div>
                </div>
            )
        })
        
        return(
            <main className="profileBlock">
              <div className="playerInfo">
                <h1>{playerDetails.username}</h1>
                <form onSubmit={this.props.updateProfile}>
                    <input id='userId' type="hidden" name="userId" value={playerDetails.userId} /><br/>
                    <input id='name' type="text" name="name" value={this.state.name||playerDetails.name} onChange={this.handleChange}/><br/>
                    <input id='email' type="text" name="email" value={this.state.email||playerDetails.email} onChange={this.handleChange}/><br/>
                    <input id='username' type="text" name="username" value={this.state.username||playerDetails.username} onChange={this.handleChange}/><br/>
                    <input id='password' type="password" name="password" value={this.state.password||playerDetails.password} onChange={this.handleChange}/><br/>
                    <br/>
                    <input type="submit" value="Update Profile" id="update"/>
                </form>
                <form onSubmit={this.props.deleteProfile}>
                    <input type="submit" value="Delete Profile" id="delete"/>
                </form>

                </div>
                <div className="charactersBlock">
                    <h1>Player Characters</h1>
                    <div className="characters">
                        {characters}
                    </div>
                </div>
            </main>
        )
    }
}

export default PlayerProfile;