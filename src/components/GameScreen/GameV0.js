import React, {Component} from 'react';
import './Game.css';

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
                name: "Comp Knight",
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
            computerMoves:[],
            playerTurn: null,
            disabled:null,
        }
    }
    // Initialize Game
    playGame=()=>{
        alert("Battle Begin!")
        console.log("Battle Begin!")
        this.resetStats()
        let player= this.state.player;
        let computer= this.state.computer; 
        this.setCompMoves()
        this.setState({disabled: false})
        console.log(this.state)
        // First Turn
        if (player.spd === computer.spd){ 
            console.log('Combatants are evenly matched')
            let x=Math.floor(Math.random()*2)
            if (x === 0) {
              this.setState({playerTurn: false}) //not getting set
              console.log(this.state.playerTurn)
              this.setState({disabled: true})
              console.log("Your Opponent takes the first move!")
              this.compTurn()
              console.log(this.state.playerTurn)
            }
            else {
              this.setState({playerTurn: true})
              console.log("You take the first move!")
            }
        // // Priority Logic
        // } else if (player.spd > computer.spd){
        //       this.setState({playerTurn: true})
        //       console.log("You take the first move!")
        // } else {
        //     this.setState({playerTurn: false})
        //       console.log("Your Opponent takes the first move!")
        //       this.compTurn()
        }
        console.log("End of first turn")
    }
    // Game Methods
    attack=()=>{ //Deals damage equilavent to attack stat
        if (this.state.playerTurn === null){
            console.log("PlayerTurn Null")
        } else if (this.state.playerTurn === true){
            let compObj= this.state.computer
            let playerAtk= (this.state.player.attack-this.state.computer.defense)
            compObj.hp = compObj.hp - playerAtk
            this.setState({computer: compObj});

            let action =`You dealt ${playerAtk} damage`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
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
    block=()=>{ //Raises defense stat (turn-based version)
        let buffDef=''
        if (this.state.playerTurn === null){
            console.log("PlayerTurn Null")
        } else if (this.state.playerTurn === true){
            let playerObj= this.state.player
            if (playerObj.defense < 15){
                buffDef= 5
                playerObj.defense = playerObj.defense + buffDef
            } else if (playerObj.defense <20){
                buffDef= 1
                playerObj.defense = playerObj.defense + buffDef
            } else {
                buffDef= 'MAXED'
                console.log('Def is Maxed')
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
            } else if (compObj.defense < 20){
                buffDef= 1
                compObj.defense = compObj.defense + buffDef
                action=`Opponent repositioned their armor`
            } else {
                buffDef= 'MAXED'
                action=`Opponent is fiddling with their armor`
            }
            console.log(action)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    recover=()=>{ //Recovers Hp equivalent to hp stat
        if (this.state.playerTurn === null){
            console.log("PlayerTurn Null")
        } else if(this.state.playerTurn === true){
        let playerObj= this.state.player
            if (playerObj.hp >= playerObj.maxHp) {
                playerObj.hp = playerObj.maxHp
                let action=`You are fully recovered`
                this.setState({moveHistory: [...this.state.moveHistory, action]})
                this.winLogic()
            } else {
                playerObj.hp = playerObj.hp + this.state.player.recover
                this.setState({player: playerObj});
                let action=`You recovered ${this.state.player.recover} hp`
                this.setState({moveHistory: [...this.state.moveHistory, action]})
                this.winLogic()
            }
        } else {
        let compObj= this.state.computer
            if (compObj.hp >= compObj.maxHp) {
                compObj.hp = compObj.maxHp
                let action=`Your Oppoent is looking healthy`
                this.setState({moveHistory: [...this.state.moveHistory, action]})
                this.winLogic()
            } else {
                compObj.hp = compObj.hp + this.state.computer.recover
                this.setState({computer: compObj});
                let action =`Your Opponent is looking healthier`
                this.setState({moveHistory: [...this.state.moveHistory, action]})
                this.winLogic()
            }
        }
    }
    trickery=()=>{ //Adds a random buff to one of the players stats
        const trickStats= ['hp','attack','defense','recover']; //add spd stat with priority
        let trickStat= trickStats[Math.floor(Math.random()*trickStats.length)];
        let trickVal=0;
        // Assign trickery values based on action
        if (trickStat === 'attack'|| trickStat ==='defense'|| trickStat ==='recover'){
            trickVal= 5;
        } else if (trickStat === 'hp'){
            trickVal= 15;
        }
        // Apply trickery action to Player/Computer
        if (this.state.playerTurn === null){
            console.log("PlayerTurn Null")
        } else if (this.state.playerTurn === true){
            let playerObj= this.state.player
            let oStat= playerObj[`${trickStat}`]
            // Trickery Buff Caps
            for (let i=0; i<playerObj.length; i++){
                if (trickStat === 'attack' && playerObj[`${trickStat}`]>=35){
                    trickVal = 35-oStat;
                } else if (trickStat === 'defense' && playerObj[`${trickStat}`]>=20){
                    trickVal = 20-oStat;
                } else if (trickStat === 'recover' && playerObj[`${trickStat}`]>=25){
                    trickVal = 25-oStat;
                } else if (trickStat === 'hp' && playerObj[`${trickStat}`]>=playerObj.maxHp){
                    trickVal = playerObj.maxHp-oStat;
                } 
            }
            playerObj[`${trickStat}`] = playerObj[`${trickStat}`] + trickVal
            this.setState({player: playerObj});

            let action=`You performed some trickery... ${trickStat} increased by ${trickVal}`
            console.log(`${trickStat}: ${playerObj[trickStat]}`)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let compObj= this.state.computer
            let oStat= compObj[`${trickStat}`]
            // Trickery Buff Caps
            for (let i=0; i<compObj.length; i++){
                if (trickStat === 'attack' && compObj[`${trickStat}`]>=35){
                    trickVal = 35-oStat;
                } else if (trickStat === 'defense' && compObj[`${trickStat}`]>=20){
                    trickVal = 20-oStat;
                } else if (trickStat === 'recover' && compObj[`${trickStat}`]>=25){
                    trickVal = 25-oStat;
                } else if (trickStat === 'hp' && compObj[`${trickStat}`]>=compObj.maxHp){
                    trickVal = compObj.maxHp-oStat;
                }
            }
            compObj[`${trickStat}`] = compObj[`${trickStat}`] + trickVal
            this.setState({computer: compObj});

            let action=`Your Opponent is getting into some mischief`
            console.log(`${trickStat}: ${compObj[trickStat]}`)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            // this.setState({moveHistory: moveHistory.push(action)})
            this.winLogic()
        }
    }
    // Turn & Win Logic
    setCompMoves=()=>{ //Adds random computer moves into computerMoves Array
        let compMoveObj=this.state.computerMoves
        // let compActions = [this.attack,this.block,this.recover,this.trickery]
        let compActions = ['attack','block','recover','trickery']
        for (let i=0; i<15; i++){
            let compAction = compActions[Math.floor(Math.random() * compActions.length)] 
            // this.setState({computerMoves: [...this.state.computerMoves, compAction]})
            this.setState({computerMoves: compMoveObj.push(compAction)})
        }
        console.log(compMoveObj)
    }
    compTurn=()=>{ //Selects 1st element in Computer Moves, assigns to action and removes it from array
        // let compObj= this.state.computer
        let computerMoves = this.state.computerMoves;
        let action = computerMoves.shift()
        console.log(action)
        console.log(computerMoves)

        // Executes action method based on action string
        if (action === 'attack'){
            this.attack()
        } else if (action === 'block'){
            this.block()
        } else if (action === 'recover'){
            this.recover()
        } else if (action === 'trickery'){
            this.trickery()
        } else {
            console.log("You've worn down your Opponent, he can no longer fight.")
            // compObj.hp = 0
            // this.setState({computer: compObj})
            this.winLogic()
        }
    }
    fullCompTurn=()=>{
        let compActions = [this.attack,this.block,this.recover,this.trickery]
        let compAction = compActions[Math.floor(Math.random() * compActions.length)] 
        return compAction()
    }
    nextTurn=()=>{ //Changes state of playerTurn to determine the next turn
        this.setState({playerTurn: !this.state.playerTurn})
        // console.log(this.state)
        if (this.state.playerTurn === false){
            console.log('playerTurn=false')
            // this.compTurn()
        } else if (this.state.playerTurn === true){
            console.log('playerTurn=true')
        }
    }
    resetStats=()=>{ //Not working
        const ogPlayer={
            title:"Player",
            name: "User Knight",
            maxHp:100,
            hp: 100,
            attack: 25,
            defense: 5,
            recover: 10,
            spd: 1,
        }
        const ogComputer={
            title:"Computer",
            name: "Comp Knight",
            maxHp:100,
            hp: 100,
            attack: 25,
            defense: 5,
            recover: 10,
            spd: 1,
        }
        this.setState({ 
            player: ogPlayer,
            computer: ogComputer,
            disabled: null, 
        })
    }
    winLogic=()=>{
        console.log('call winLogic')
        console.log(this.state)
        if (this.state.player.hp <= 0){
            this.resetStats()
            alert("You have been defeated")
            // console.log(this.state.moveHistory)
        } else if (this.state.computer.hp <= 0){
            this.resetStats()
            alert("You are Victorious!")
            // console.log(this.state.moveHistory)
        } else {
            this.nextTurn()
        }
    }
    // Render Game Screen
    render(){
        let player= this.state.player;
        let computer= this.state.computer;
        let moveHistory= this.state.moveHistory.map((move,index)=>{
            // console.log(move)
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
                    {this.state.playerTurn || this.state.playerTurn===null ? this.state.disabled :
                        <div className="actionbox">
                            <button className="action" id="attack" onClick={this.fullCompTurn}>Comp Action</button>
                            {/* <button className="action" id="attack" onClick={this.attack}>Attack!</button>
                            <button className="action" id="defend" onClick={this.block}>Block</button>
                            <button className="action" id="recover" onClick={this.recover}>Recover</button>
                            <button className="action" id="trick" onClick={this.trickery}>Trickery</button> */}
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