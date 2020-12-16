import React, {Component} from 'react';
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
                attack: 25,
                defense: 5,
                recover: 10,
                spd: 1,
            },
            computer:{
                title:"Computer",
                name: "Computer Knight",
                maxHp:100,
                hp: 100,
                attack: 25,
                defense: 5,
                recover: 10,
                spd: 1,
            },
            currentTurn:{
                playerMove:'',
                playerPriority:0,
                computerMove:'',
                computerPriority:0
            },
            moveHistory:[],
            playerTurn: null,
            disabled:false,
        }
    }
    // Initialize Game
    playGame=()=>{
        // alert("Battle Begin!")
        console.log("Battle Begin!")
        let player= this.state.player;
        let computer= this.state.computer; 
        let moveHistory = this.state.moveHistory;
        this.setState({disabled: false})
        // First Turn
        if (player.spd === computer.spd){ 
            console.log('Combatants are evenly matched')
            let x=Math.floor(Math.random()*2)
            if (x === 0) {
              this.setState({playerTurn: false})
              this.setState({disabled: true})
              console.log("Your opponent takes the first move!")
            }
            else {
              this.setState({playerTurn: true})
              console.log("You take the first move!")
            }
        } else if (player.spd > computer.spd){
              this.setState({playerTurn: true})
              console.log("You take the first move!")
        } else {
            this.setState({playerTurn: false})
              console.log("Your opponent takes the first move!")
        }
        console.log("First Round complete, turn order set")
        // Next Turn (Game Logic)

        // this.nextTurn() 
        console.log("called")
        console.log(moveHistory)
    }
    // Game Methods
    attack=()=>{
        if (this.state.playerTurn === true){
            let compObj= this.state.computer
            let playerAtk= (this.state.player.attack-this.state.computer.defense)
            compObj.hp = compObj.hp - playerAtk
            this.setState({computer: compObj});

            let action =`You dealt ${playerAtk} damage`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else if(this.state.playerTurn === false){
            let playerObj= this.state.player
            let compAtk= (this.state.computer.attack-this.state.player.defense)
            playerObj.hp = playerObj.hp - compAtk
            this.setState({player: playerObj});

            let action=`You took ${compAtk} damage`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    block=()=>{
        if (this.state.playerTurn === true){
            let action=`You've prepared for an attack`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let action=`Opponent blocked some of your damage`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    recover=()=>{
        if(this.state.playerTurn === true){
            let playerObj= this.state.player
            playerObj.hp = playerObj.hp + this.state.player.recover
            this.setState({player: playerObj});

            let action=`You recovered ${this.state.player.recover} hp`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else if (this.state.playerTurn === false){
            let compObj= this.state.computer
            compObj.hp = compObj.hp + this.state.computer.recover
            this.setState({computer: compObj});

            let action =`Your opponent is looking healthier`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    trickery=()=>{
        const trickStats= ['hp','attack','defense','recover','spd'];
        let trickStat= trickStats[Math.floor(Math.random()*trickStats.length)]
        if (this.state.playerTurn === true){
            let action=`You performed some trickery... ${trickStat} increased`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let action=`Your opponent is getting into some mischief`
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    // Turn & Win Logic
    nextTurn=()=>{ 
        console.log(this.state.playerTurn)
        if (this.state.playerTurn === false){
            // this.setState({playerTurn: !this.state.playerTurn})
            // let compActions = [this.attack,this.block,this.recover,this.trickery]
            // let compAction = compActions[Math.floor(Math.random() * compActions.length)]
            // console.log(compAction()) //CompAction is a function (technically) 
        } else if (this.state.playerTurn === true){
            // this.setState({playerTurn: !this.state.playerTurn})
        }
    }
    winLogic=()=>{
        if (this.state.player.hp === 0){
            alert("You have been defeated")
            this.setState({disabled: true})
            console.log(this.state.moveHistory)
        } else if (this.state.computer.hp === 0){
            alert("You are Victorious!")
            this.setState({disabled: true})
            console.log(this.state.moveHistory)
        } else {
            this.setState({playerTurn: !this.state.playerTurn})
            this.nextTurn()
        }
    }
    // Render Game Screen
    render(){
        let player= this.state.player;
        let computer= this.state.computer;
        console.log(this.state)
        return(
            <main>
                {/* <!-- Player --> */}
                <div className="characterbox" id="player1">
                    <div className="char" >
                        <h2>{player.title}</h2>
                        <div className="hpBar" hp={this.state.player.hp} maxhp={this.state.player.maxHp}></div>
                    </div>
                    {this.state.playerTurn ? 
                        <div className="actionbox">
                            <button className="action" id="attack" onClick={this.attack}>Attack!</button>
                            <button className="action" id="defend" onClick={this.block}>Block</button>
                            <button className="action" id="recover" onClick={this.recover}>Recover</button>
                            <button className="action" id="trick" onClick={this.trickery}>Trickery</button>
                        </div>
                    : this.state.disabled
                    }
                </div>
                    {/* <!-- Middle Space --> */}
                <div className="middle-space">
                    <h1 id="play" onClick={this.playGame}>Play</h1>
                </div>
                {/* <!-- Computer --> */}
                <div className="characterbox" id="playerC">
                    <div className="char" >
                        <h2>{computer.title}</h2>
                        <div className="hpBar" hp={this.state.computer.hp} maxhp={this.state.computer.maxHp}></div>
                    </div>
                    {this.state.playerTurn ? this.state.disabled :
                        <div className="actionbox">
                            <button className="action" id="attack" onClick={this.attack}>Attack!</button>
                            <button className="action" id="defend" onClick={this.block}>Block</button>
                            <button className="action" id="recover" onClick={this.recover}>Recover</button>
                            <button className="action" id="trick" onClick={this.trickery}>Trickery</button>
                        </div>
                    }
                </div>
            </main>
        )
    }
}

export default GameScreen;