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
            show:false,
            primaryCharacter:'',

            hp:'',
            atk:'',
            def:'',
            rec:'',
            spd:''
        }
    }
    handleChange=(event)=>{
        event.preventDefault()
        this.setState({
          [event.target.name]:event.target.value
        })
    }
    toggleShow=()=>{
        this.setState({show: !this.state.show})
    }
    // togglePrimary=(event)=>{
    //     event.preventDefault();
    //     let primaryCharacter = this.event.target
    //     // this.setState({
    //     //     primaryCharacter: })
    // }
    render(){
        const playerDetails= this.props.user;
        console.log(playerDetails)
        console.log(playerDetails.Characters)
        let characters= playerDetails.Characters.map((character,index)=>{
            return(
                <div className="characterInfo" key={index}>
                    <form onSubmit={this.props.updateCharacter}>
                        <p id="charName" onClick={this.togglePrimary}>{character.name}</p>
                        <input id='charId' type="hidden" name="characterId" value={character.id}/>
                        <span>Hp:</span><input id="hpStat" className="stat" type="text" name="hp" value={this.state.hp||character.hp} onChange={this.handleChange}/><br/>
                        <span>Atk:</span><input id="atkStat" className="stat" type="text" name="attack" value={this.state.atk||character.attack} onChange={this.handleChange}/><br/>
                        <span>Def:</span><input id="defStat" className="stat" type="text" name="defense" value={this.state.def||character.defense} onChange={this.handleChange}/><br/>
                        <span>Rec:</span><input id="defStat" className="stat" type="text" name="recover" value={this.state.rec||character.recover} onChange={this.handleChange}/><br/>
                        <span>Spd:</span><input id="spdStat" className="stat" type="text" name="spd" value={this.state.spd||character.spd} onChange={this.handleChange}/><br/>
                        
                        <input type="submit" value="Update" className="button"/>
                        <button id={character.id} onClick={this.props.deleteCharacter}>Delete</button>
                    </form>
                    {/* <form onSubmit={this.props.deleteCharacter} >
                        <input type="submit" id={character.id} value="Delete" className="button"/>
                    </form> */}
                </div>
            )
        })
        return(
            <main className="profileBlock">
              <div className="playerInfo">
                <h1>{playerDetails.username}</h1>
                <form onSubmit={this.props.updateProfile}>
                    <input id='userId' type="hidden" name="userId" value={playerDetails.id} /><br/>
                    <input id='name' type="text" name="name" value={this.state.name||playerDetails.name} onChange={this.handleChange}/><br/>
                    <input id='email' type="text" name="email" value={this.state.email||playerDetails.email} onChange={this.handleChange}/><br/>
                    <input id='username' type="text" name="username" value={this.state.username||playerDetails.username} onChange={this.handleChange}/><br/>
                    <input id='password' type="password" name="password" value={this.state.password||playerDetails.password} onChange={this.handleChange}/>
                    <br/>
                    <input type="submit" value="Update Profile" className="button"/>
                </form>
                <form onSubmit={this.props.deleteProfile}>
                    <input type="submit" value="Delete Profile" className="button"/>
                </form>

                </div>
                <div className="charactersBlock">
                    <h1>Player Characters</h1>
                    {this.props.user.Characters.length <4 
                        ? <button onClick={this.toggleShow} id="toggle">Add Character</button> 
                        : <div className="charCap">
                            <h2>Reached Character Max of 4</h2><br/>
                            <h3>(delete or update current character)</h3>
                         </div>
                    }
                    <br/>
                    {this.state.show ? 
                        <div className="addCharacter">
                        <form onSubmit={this.props.addCharacter} id="addCharForm">
                            <input type="text" name="name" placeholder="Character Name/Title"/><br/>
                            <input type="text" name="hp" placeholder="Max Hp"/><br/>
                            <input type="text" name="attack" placeholder="Atk Stat"/><br/>
                            <input type="text" name="defense" placeholder="Defense Stat"/><br/>
                            <input type="text" name="recover" placeholder="Recover Stat"/><br/>
                            <input type="text" name="spd" placeholder='spd (enter 1)'/><br/>
                            <input type="hidden" name="userId" value={playerDetails.id}/>
                            <input type="submit" id="submit" placeholder="Add Character" className="button"/>
                        </form>
                        </div>
                        : null
                    }
                    {/* </div> */}
                    <div className="characters">
                        {characters}
                    </div>
                </div>
            </main>
        )
    }
}

export default PlayerProfile;