import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import 'PlayerProfile.css';

class PlayerProfile extends Component{
    constructor(){
        super()
        this.state={
            name: '',
            email: '',
            username: '',
            password: '',
            characters:[]
        }
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