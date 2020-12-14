import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './GameScreen.css';

class GameScreen extends Component{
    playGame=()=>{
        alert("Battle Begin!")
        console.log("Battle Begin!")
    }
    render(){
        return(
            <main>
                {/* <!-- Player --> */}
                <div className="playerbox" id="player1">
                    <div className="char" >
                        <h2>Username</h2>
                        <div className="hpBar" hp="" maxHP="100"></div>
                    </div>
                    <div className="actionbox">
                        <button className="action" id="attack">Attack!</button>
                        <button className="action" id="defend">Block</button>
                        <button className="action" id="recover">Recover</button>
                        <button className="action" id="trick">Trickery</button>
                    </div>
                </div>
                    {/* <!-- Middle Space --> */}
                <div className="middle-space">
                    <h1 id="play" onClick={this.playGame}>Play</h1>
                </div>
                {/* <!-- Computer --> */}
                <div className="playerbox" id="playerC">
                    <div className="char" >
                        <h2>Computer</h2>
                        <div className="hpBar" hp="" maxHP="100"></div>
                    </div>
                    <div className="actionbox" >
                        <button className="action" id="attack">Attack!</button>
                        <button className="action" id="defend">Block</button>
                        <button className="action" id="recover">Recover</button>
                        <button className="action" id="trick">Trickery</button>
                    </div>
                </div>
            </main>
        )
    }
}

export default GameScreen;