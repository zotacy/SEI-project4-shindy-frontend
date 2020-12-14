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
            playerTurn: null,
            moves:[],
            disabled:false,
            // currentTurn:{},
        }
    }
    //Game Logic
    playGame=()=>{
        alert("Battle Begin!")
        console.log("Battle Begin!")
        let player= this.state.player;
        let computer= this.state.computer; 
        let moves = this.state.moves;
        if (player.spd === computer.spd && moves.length==0){
            console.log('speeds match, moves 0')
            let x=Math.floor(Math.random()*2)
            if (x===0) {
                console.log('x= 0')
                this.setState({playerTurn: false})
            }
            else {
                this.setState({playerTurn: true})
            }
        }
        this.nextTurn()
    }
    
    // Game Methods
    attack=()=>{
        if (this.state.playerTurn === true){
            let compObj= this.state.computer
            compObj.hp = compObj.hp - this.state.player.attack
            this.setState({
                computer: compObj
            });
            let action =`You dealt ${this.state.player.attack} damage`
            console.log(action)
            this.setState({moves: [...this.state.moves, action]})
            this.nextTurn()
        } else {
            let playerObj= this.state.player
            playerObj.hp = playerObj.hp - this.state.computer.attack
            this.setState({
                player: playerObj
            });
            let action=`You took ${this.state.computer.attack} damage`
            console.log(action)
            this.setState({moves: [...this.state.moves, action]})
            this.nextTurn()
        }
    }
    block=()=>{
        if (this.state.playerTurn === true){
            console.log(`You blocked ${this.state.player.defense*2} damage`)
        } else {
            console.log(`Opponent blocked some of your damage`)
        }
    }
    recover=()=>{
        if (this.state.playerTurn === true){
            console.log(`You recovered ${this.state.player.recover} hp`)
        } else {
            console.log(`Your opponent recovered ${this.state.computer.recover} hp`)
        }
    }
    trickery=()=>{
        const trickStats= ['hp,attack,defense,recover,spd'];
        let trickStat= trickStats[Math.floor(Math.random()*trickStats.length)]
        if (this.state.playerTurn === true){
            console.log(`You performed some trickery... ${trickStat} increased`)
        } else {
            console.log(`Your opponent is getting into some mischief`)
        }
    }
    updateHp=()=>{
        console.log(`${this.state.title}`)
    }
    nextTurn=()=>{ // Infinite Loop Error when using this.setState
        let player= this.state.player;
        let computer= this.state.computer; 
        let moves = this.state.moves;
        console.log(`${this.state.playerTurn}'s turn`)
        if (this.state.playerTurn === false){
            console.log('comp turn else if')
            this.setState({playerTurn: !this.state.playerTurn})
        } else if (this.state.playerTurn === true){
            console.log('player turn else if')
            this.setState({playerTurn: !this.state.playerTurn})
        }
        // (player.spd > computer.spd) && (moves[moves.length-1]=='comp' || moves[moves.length-1]==null)){
    }
    
    // Render Game Screen
    render(){
        let player= this.state.player;
        let computer= this.state.computer; 
        let currentTurn= this.currentTurn;
        // this.nextTurn()
        console.log(this.state)
        // console.log(this.state.turn)
        return(
            <main>
                {/* <!-- Player --> */}
                <div className="playerbox" id="player1">
                    <div className="char" >
                        <h2>{player.title}</h2>
                        <div className="hpBar" hp="" maxhp={this.state.player.hp}></div>
                    </div>
                    <div className="actionbox">
                        <button className="action" id="attack" onClick={this.attack} disabled={this.state.disabled}>Attack!</button>
                        <button className="action" id="defend" onClick={this.block} disabled={this.state.disabled}>Block</button>
                        <button className="action" id="recover" onClick={this.recover} disabled={this.state.disabled}>Recover</button>
                        <button className="action" id="trick" onClick={this.trickery} disabled={this.state.disabled}>Trickery</button>
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
                        <div className="hpBar" hp="" maxhp={this.state.computer.hp}></div>
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