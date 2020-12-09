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
                <h1>Player Profile</h1>
            </div>
        )
    }
}

export default PlayerProfile;