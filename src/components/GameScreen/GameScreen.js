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
    attack=()=>{ //Deals damage equilavent to attack stat
        if (this.state.playerTurn === true){
            let compObj= this.state.computer
            let playerAtk= (this.state.player.attack-this.state.computer.defense)
            compObj.hp = compObj.hp - playerAtk
            this.setState({computer: compObj});

            let action =`You dealt ${playerAtk} damage`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else if(this.state.playerTurn === false){
            let playerObj= this.state.player
            let compAtk= (this.state.computer.attack-this.state.player.defense)
            playerObj.hp = playerObj.hp - compAtk
            this.setState({player: playerObj});

            let action=`You took ${compAtk} damage`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    block=()=>{ //Raises defense stat (turn-based version)
        let buffDef=''
        if (this.state.playerTurn === true){
            let playerObj= this.state.player
            if (playerObj.defense < 15){
                buffDef= 5
                playerObj.defense = playerObj.defense + buffDef
            } else {
                buffDef= 1
                playerObj.defense = playerObj.defense + buffDef
            }
            let action=`You've prepared for an attack. (Def + ${buffDef})`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let compObj= this.state.computer
            let action=''
            if (compObj.defense < 15){
                buffDef= 5
                compObj.defense = compObj.defense + buffDef
                action=`Opponent added armor`
            } else {
                buffDef= 1
                compObj.defense = compObj.defense + buffDef
                action=`Opponent repositioned their armor`
            }
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    recover=()=>{ //Recovers Hp equivalent to hp stat
        if(this.state.playerTurn === true){
            let playerObj= this.state.player
            playerObj.hp = playerObj.hp + this.state.player.recover
            this.setState({player: playerObj});

            let action=`You recovered ${this.state.player.recover} hp`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else if (this.state.playerTurn === false){
            let compObj= this.state.computer
            compObj.hp = compObj.hp + this.state.computer.recover
            this.setState({computer: compObj});

            let action =`Your opponent is looking healthier`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    trickery=()=>{ //Adds a random buff to one of the players stats
        const trickStats= ['hp','attack','defense','recover','spd'];
        let trickStat= trickStats[Math.floor(Math.random()*trickStats.length)];
        let trickVal= 7;
        if (this.state.playerTurn === true){
            let playerObj= this.state.player
            playerObj[`${trickStat}`] = playerObj[`${trickStat}`] + trickVal
            this.setState({player: playerObj});

            let action=`You performed some trickery... ${trickStat} increased by ${trickVal}`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let compObj= this.state.computer
            compObj[`${trickStat}`] = compObj[`${trickStat}`] + trickVal
            this.setState({computer: compObj});

            let action=`Your opponent is getting into some mischief`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    // Turn & Win Logic
    nextTurn=()=>{ 
        // console.log(this.state.playerTurn)
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
        let moveHistory= this.state.moveHistory.map((move,index)=>{
            console.log(move)
            // use to match with color with player? (this.state.playerTurn===true)
            if (index%2===0){
                return(
                    <p key={index} id="even">{move}</p>
                )
            } else {
                return(
                    <p key={index} id="odd">{move}</p>
                )
            }
        })
        return(
            <main className="gameMain">
            <div className="gameScreen">
                {/* <!-- Player --> */}
                <div className="characterbox" id="player1">
                    <div className="char" >
                        <h2>{player.title}</h2>
                        <progress id="hpBar" value={this.state.player.hp} max='100'></progress>
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
                        <progress id="hpBar" value={this.state.computer.hp} max='100'></progress>
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
            </div>
            <div className="mhContainer">
                <h2 id="title">Move History</h2><br/>
                <div className="moveHistory">
                    {moveHistory}
                </div>
            </div>
            </main>
        )
    }
}

export default GameScreen;