import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './PlayerProfile.css';

class PlayerProfile extends Component{
    constructor(props){
        super(props)
    //     this.state={
    //         // username: this.props.user.username,
    //         userId: this.props.user.id,
    //         name: this.props.user.name,
    //         email: this.props.user.email,
    //         username: this.props.user.username,
    //         password: this.props.user.password,
    //         characters: this.props.user.characters,
    //     }
    }

    render(){
        const playerDetails= this.props.user;
        console.log(playerDetails)
        console.log(playerDetails.Characters)
        let characters= playerDetails.Characters.map((character,index)=>{
            return(
                <div className="characterInfo">
                    <div key={index}>
                        <p id="charName">"{character.name}"</p>
                        <p id="hpStat">hp: {character.hp}</p>
                        <p id="atkStat">attack: {character.attack}</p>
                        <p id="defStat">defense: {character.defense}</p>
                        <p id="spdStat">spd: {character.spd}</p>
                    </div>
                </div>
            )
        })
        console.log(characters)
        
        return(
            <main className="profileBlock">
              <div className="playerInfo">
                <h1>{playerDetails.username}</h1>
                <form onSubmit={this.props.updateProfile}>
                    <input id='userId' type="hidden" name="userId" value={playerDetails.userId} /><br/>
                    <input id='name' type="text" name="name" placeholder={playerDetails.name} /><br/>
                    <input id='email' type="text" name="email" placeholder={playerDetails.email} /><br/>
                    <input id='username' type="text" name="username" placeholder={playerDetails.username} /><br/>
                    <input id='password' type="password" name="password" placeholder='Update Password'/><br/>
                    <br/>
                    <input type="submit" value="Update Profile" />
                </form>
                <form onSubmit={this.props.deleteProfile}>
                    <input type="submit" value="Delete Profile" />
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