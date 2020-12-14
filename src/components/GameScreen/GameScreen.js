import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './GameScreen.css';

class GameScreen extends Component{
    constructor(){
        super()
        this.state={
            // userChar: this.props.user.Character[0],
            player:{
                title:"Player",
                name: "User Knight",
                maxHp:100,
                hp: 100,
                attack: 20,
                defense: 5,
                recover: 10,
                spd: 1,

            },
            computer:{
                title:"Computer",
                name: "Computer Knight",
                maxHp:100,
                hp: 100,
                attack: 20,
                defense: 5,
                recover: 10,
                spd: 1,
            },
            turn:'',
            currentTurn:{},
        }
    }
    //Game Logic
    playGame=()=>{
        alert("Battle Begin!")
        console.log("Battle Begin!")
    }
    // Game Methods
    attack=()=>{
        console.log('Attack!')
    }
    block=()=>{
        console.log('Block')
    }
    recover=()=>{
        console.log(`Recovered hp`)
    }
    trickery=()=>{
        console.log('...Trickery has occured...')
    }
    updateHp=()=>{
        console.log(`${this.state.title}`)
    }
    // Render Game Screen
    render(){
        let player= this.state.player;
        let computer= this.state.computer; 
        let currentTurn= this.currentTurn;
        // Infinite Loop Error: when using this.setState
        if (player.spd === computer.spd){
           let x=Math.floor(Math.random()*2)
           if (x===0) {this.state.turn='comp'}
           else {this.state.turn='player'} 
        } else if (player.spd > computer.spd){
            this.state.turn='player'
        } else {
            this.state.turn='comp'
        }
        if (this.state.turn ==='player'){
            this.state.currentTurn= this.state.player
        } else {
            this.state.currentTurn= this.state.computer
        }
        console.log(this.state)
        console.log(this.state.turn) 
        // console.log(this.currentTurn.title)
        return(
            <main>
                {/* <!-- Player --> */}
                <div className="playerbox" id="player1">
                    <div className="char" >
                        <h2>{player.title}</h2>
                        <div className="hpBar" hp="" maxhp="100"></div>
                    </div>
                    <div className="actionbox">
                        <button className="action" id="attack" onClick={this.attack}>Attack!</button>
                        <button className="action" id="defend" onClick={this.block}>Block</button>
                        <button className="action" id="recover" onClick={this.recover}>Recover</button>
                        <button className="action" id="trick" onClick={this.trickery}>Trickery</button>
                    </div>
                </div>
                    {/* <!-- Middle Space --> */}
                <div className="middle-space">
                    <h1 id="play" onClick={this.playGame}>Play</h1>
                </div>
                {/* <!-- Computer --> */}
                <div className="playerbox" id="playerC">
                    <div className="char" >
                        <h2>{computer.title}</h2>
                        <div className="hpBar" hp="" maxhp="100"></div>
                    </div>
                    <div className="actionbox" >
                        <button className="action" id="attack" >Attack!</button>
                        <button className="action" id="defend" >Block</button>
                        <button className="action" id="recover" >Recover</button>
                        <button className="action" id="trick" >Trickery</button>
                    </div>
                </div>
            </main>
        )
    }
}

export default GameScreen;