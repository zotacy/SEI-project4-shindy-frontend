import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import 'CreateCharacter.css';

class CreateCharacter extends Component{
    handleCreate=(event)=>{
        event.preventDefault();
        this.props.createCharacter
        setTimeout(()=>{
            this.props.history.push(`/profile/${this.props.userId}`)
        },300)
    }
    render(){
        return(
            <div>
                <h1>New Character</h1>
                <form onSubmit={this.handleCreate}>
                    <input type="hidden" name="userId" value={this.props.userId}/><br/>
                    <input type="text" name="name" placeholder="Character Name/Title"/><br/>
                    <input type="text" name="hp" placeholder="Max Hp"/><br/>
                    <input type="text" name="attack" placeholder="Atk Stat"/><br/>
                    <input type="text" name="defense" placeholder="Def Stat"/><br/>
                    <input type="text" name="recover" placeholder="Recover Stat"/><br/>
                    <input type="text" name="spd" value='1'/><br/>
                    {/* <!-- Submit button --> */}
                    <input id="submit"  type="submit" value="Add Character" />
                </form>
            </div>
        )
    }
}

export default CreateCharacter;