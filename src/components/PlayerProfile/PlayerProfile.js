import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import 'PlayerProfile.css';

class PlayerProfile extends Component{
    constructor(){
        super()
        this.state={
            characters:[]
        }
    }

    componentDidMount = ()=>{
        this.getCharacters()
    }
    getCharacters = async()=>{
        const response = await axios(`${ShindyBackendUrl}/characters`)
        this.setState({
            characters: response.data.allCharacters
        })
    }

    addCharacter = async(event)=>{ //add event because it is connected to a form
        event.preventDefault()
        await axios.post(`${ShindyBackendUrl}/characters`,{
            name: event.target.name.value
        })
        this.getCharacters()
    }
    updateCharacter = async(event)=>{
        event.preventDefault()
        let characterId = event.target.characterId.value
        await axios.put(`${ShindyBackendUrl}/characters/${characterId}`,{
            name: event.target.name.value,
            characterId: characterId
        })
        this.getCharacters()
    }
    deleteCharacter = async(event)=>{
        event.preventDefault()
        let characterId = event.target.id
        await axios.delete(`${ShindyBackendUrl}/characters/${characterId}`)
        this.getCharacters()
    }

    render(){
        return(
            <div>
             <div className="playerInfo">
                <h1>Player Profile</h1>
                <form>
                    Name:<input id='name' type="text" name="name" value="<%=user.name%>" /><br/>
                    Username:<input id='username' type="text" name="username" value="<%=user.username%>" /><br/>
                    Bio:<input id='bio' class="no-outline" type="text" name="bio" value="<%=user.bio%>" /><br />
                    <br/>
                    {/* <!-- Edit Profile --> */}
                    <input type="submit" value="Edit Profile" />
                </form>

                {/* <!-- Delete Profile --> */}
                <form action="/users/<%= user.id %>?_method=DELETE" method="POST">
                    <input type="submit" value="Delete Profile" />
                </form>
             </div>
             <div className="characterList">
                 <h1>Player Characters</h1>
             </div>
            </div>
        )
    }
}

export default PlayerProfile;