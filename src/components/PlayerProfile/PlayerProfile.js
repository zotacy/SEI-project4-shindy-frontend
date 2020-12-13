import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './PlayerProfile.css';

class PlayerProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            username: 'Hardcoded Username',
            userId: this.props.user.id,
            name: this.props.user.name,
            email: this.props.user.email,
            // username: this.props.user.username,
            // password: this.props.user.password,
            characters: this.props.user.characters,
        }
    }  
    render(){
        const playerDetails= this.props.user
        console.log(playerDetails)
        // console.log(this.state)
        console.log(this.state)
        let player= this.props.user.username

        // let playerCharacters= playerDetails.characters.map((character,index)=>{
        //     return(
        //         <div className="characters">
        //             <div key={index}>
        //                 {character.name}
        //             </div>
        //         </div>
        //     )
        // })

        return(
            <main className="App-main">
              <div className="player-info">
                <h2>{this.state.username}</h2>
                <form onSubmit={this.props.updateProfile}>
                    <input id='userId' type="hidden" name="userId" value={this.state.userId} /><br/>
                    Name:<input id='name' type="text" name="name" value={this.state.name} /><br/>
                    Email:<input id='email' type="text" name="email" value={this.state.email} /><br/>
                    Username:<input id='username' type="text" name="username" value={this.state.username} /><br/>
                    Password:<input id='password' type="password" name="password" value={this.state.password} /><br/>
                    <br/>
                    <input type="submit" value="Edit Profile" />
                </form>

                <form onSubmit={this.props.deleteProfile}>
                    <input type="submit" value="Delete Profile" />
                </form>
                </div>
                {/* <div className="userList">
                    <h1>Player Characters</h1>
                    {playerCharacters}
                </div> */}
            </main>
        )
    }
}

export default PlayerProfile;