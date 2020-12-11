import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './PlayerProfile.css';

class PlayerProfile extends Component{  
    render(){
        console.log(this.props)
        // const paramsId = parseInt(this.props.match.params.id)
        const playerDetails= this.props.users.map((user=>{
            return(
                <div key={user.id} className="no-bullets">
                    <h1>{user.username}</h1>
                    <button key={user.id} id={user.id} onClick={this.props.deleteProfile()}>
                        Delete
                    </button>
                </div>
            )
        }))
        console.log(playerDetails)
        const playerCharacters= playerDetails.Characters.map(character =>{
            return(
                <li key={character.id} className="no-bullets">{character.name}</li>
            ) 
        })
        return(
            <div>
                <div className="playerInfo">
                <h1>{playerDetails.username}</h1>
                <form onSubmit={this.updateProfile}>
                    Name:<input id='name' type="text" name="name" value="<%=user.name%>" /><br/>
                    Username:<input id='username' type="text" name="username" value="<%=user.username%>" /><br/>
                    <br/>
                    <input type="submit" value="Edit Profile" />
                </form>

                <form onSubmit={this.deleteProfile}>
                    <input type="submit" value="Delete Profile" />
                </form>
                </div>
                <div className="userList">
                    <h1>Player Characters</h1>
                    {playerCharacters}
                </div>
            </div>
        )
    }
}

export default PlayerProfile;