import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './GameScreen.css';

class GameScreen extends Component{
    render(){
        return(
            <main>
                {/* <!-- Player --> */}
                <div className="playerbox" id="player1">
                    <div className="char" id="player1">
                        <h2>Username</h2>
                        <div className="hpBar" hp="" maxHP="100"></div>
                    </div>
                    <div className="actionbox" id="player1">
                        <button className="action" id="attack">Attack!</button>
                        <button className="action" id="defend">Block</button>
                        <button className="action" id="recover">Recover</button>
                        <button className="action" id="trick">Trickery</button>
                    </div>
                </div>
                    {/* <!-- Middle Space --> */}
                <div classNameName="middle-space">
                    <h1>Shindy</h1>
                </div>
                {/* <!-- Computer --> */}
                <div className="playerbox" id="playerC">
                    <div className="char" id="playerC">
                        <h2>Computer</h2>
                        <div className="hpBar" hp="" maxHP="100"></div>
                    </div>
                    <div className="actionbox" id="player1">
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