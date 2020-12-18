import React, {Component} from 'react';
import './Game.css';

//////// Helper functions
const setProp = name => value => obj => ({
    ...obj,
    [name]: value
})
const setProp2 = name1 => name2 => value => obj => ({
    ...obj,
    [name1]: {
        ...obj[name1],
        [name2]: value
    }
})

//////// Initial States
const initialState = () => ({
    player: {
      name: "Player Knight",
      maxHp: 100,
      hp: 100,
      attack: 25,
      defense: 5,
      recover:10,
      spd:1,
      time: 7000,
    },
    enemy: {
        name: "Comp Knight",
        maxHp: 100,
        hp: 100,
        attack: 25,
        defense: 5,
        recover:10,
        spd:1,
        time: 4000,
    },
    moveHistory:[],
    currentTurn: '',
    disabled:null,
  })

class GameScreen extends Component{
    constructor(props){
        super(props)
        this.state = this.props.initialState ? {...this.props.initialState} : {...initialState()}
    }
    resetState = () => ({...initialState})
    // Initialize Game
    playGame=()=>{
        alert("Battle Begin!")
        console.log("Battle Begin!")
        console.log(this.state)
        this.resetState()
        // First Turn
        if (this.state.player.spd === this.state.enemy.spd){ 
            console.log('Combatants are evenly matched')
            let x=Math.floor(Math.random()*2)
            if (x === 0) {
              console.log("Your Opponent takes the first move!")
              this.setState({currentTurn: 'Comp'}) //not getting set
              console.log(this.state.currentTurn)
            //   this.fullCompTurn()
              console.log(this.state.currentTurn)
            }
            else {
              console.log("You take the first move!")
              this.setState({currentTurn: "Player"})
            }
        }
        console.log("End of first turn")
    }
    // Game Methods
    attack=()=>{ //Deals damage equilavent to attack stat
        if (this.state.currentTurn === null){
            console.log("currentTurn Null")
        } else if (this.state.currentTurn === "Player"){
            let enemyObj= this.state.enemy
            let playerAtk= (this.state.player.attack-this.state.enemy.defense)
            enemyObj.hp = enemyObj.hp - playerAtk
            this.setState({enemy: enemyObj});

            let action =`You dealt ${playerAtk} damage`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        } else {
            let playerObj= this.state.player
            let compAtk= (this.state.enemy.attack-this.state.player.defense)
            playerObj.hp = playerObj.hp - compAtk
            this.setState({player: playerObj});

            let action=`You took ${compAtk} damage`
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    block=()=>{ //Raises defense stat (turn-based version)
        let buffDef=''
        if (this.state.currentTurn === null){
            console.log("currentTurn Null")
        } else if (this.state.currentTurn === "Player"){
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
            let enemyObj= this.state.enemy
            let action=''
            if (enemyObj.defense < 15){
                buffDef= 5
                enemyObj.defense = enemyObj.defense + buffDef
                action=`Opponent added armor`
            } else if (enemyObj.defense < 20){
                buffDef= 1
                enemyObj.defense = enemyObj.defense + buffDef
                action=`Opponent repositioned their armor`
            } else {
                buffDef= 'MAXED'
                action=`Opponent is fiddling with their armor`
            }
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            this.winLogic()
        }
    }
    recover=()=>{ //Recovers Hp equivalent to hp stat
        if (this.state.currentTurn === null){
            console.log("currentTurn Null")
        } else if(this.state.currentTurn === "Player"){
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
        let enemyObj= this.state.enemy
            if (enemyObj.hp >= enemyObj.maxHp) {
                enemyObj.hp = enemyObj.maxHp
                let action=`Your Oppoent is looking healthy`
                this.setState({moveHistory: [...this.state.moveHistory, action]})
                this.winLogic()
            } else {
                enemyObj.hp = enemyObj.hp + this.state.enemy.recover
                this.setState({enemy: enemyObj});
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
        // Apply trickery action to Player/enemy
        if (this.state.currentTurn === null){
            console.log("currentTurn Null")
        } else if (this.state.currentTurn === "Player"){
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
            let enemyObj= this.state.enemy
            let oStat= enemyObj[`${trickStat}`]
            // Trickery Buff Caps
            for (let i=0; i<enemyObj.length; i++){
                if (trickStat === 'attack' && enemyObj[`${trickStat}`]>=35){
                    trickVal = 35-oStat;
                } else if (trickStat === 'defense' && enemyObj[`${trickStat}`]>=20){
                    trickVal = 20-oStat;
                } else if (trickStat === 'recover' && enemyObj[`${trickStat}`]>=25){
                    trickVal = 25-oStat;
                } else if (trickStat === 'hp' && enemyObj[`${trickStat}`]>=enemyObj.maxHp){
                    trickVal = enemyObj.maxHp-oStat;
                }
            }
            enemyObj[`${trickStat}`] = enemyObj[`${trickStat}`] + trickVal
            this.setState({enemy: enemyObj});

            let action=`Your Opponent is getting into some mischief`
            console.log(`${trickStat}: ${enemyObj[trickStat]}`)
            this.setState({moveHistory: [...this.state.moveHistory, action]})
            // this.setState({moveHistory: moveHistory.push(action)})
            this.winLogic()
        }
    }
    // Turn & Win Logic
    fullCompTurn=()=>{
        let compActions = [this.attack,this.block,this.recover,this.trickery]
        let compAction = compActions[Math.floor(Math.random() * compActions.length)] 
        return compAction()   
    }
    nextTurn=()=>{ //Changes state of currentTurn to determine the next turn (Cannot contain CompTurn...)
        console.log("Calling next Turn")
        if (this.state.currentTurn === 'Comp'){
            this.setState({currentTurn: 'Player'})
            console.log('Player Turn')
        } else if (this.state.currentTurn === "Player"){
            this.setState({currentTurn: 'Comp'})
            console.log('Comp Turn')
        }
    }
    winLogic=()=>{
        console.log('call winLogic')
        console.log(this.state)
        if (this.state.player.hp <= 0){
            alert("You have been defeated")
            this.setState({disabled:null})
            console.log(this.state.moveHistory)
        } else if (this.state.enemy.hp <= 0){
            alert("You are Victorious!")
            this.setState({disabled:null})
            console.log(this.state.moveHistory)
        } else {
            this.nextTurn()
        }
    }
    // Render Game Screen
    render(){
        let player= this.state.player;
        let enemy= this.state.enemy;
        let moveHistory= this.state.moveHistory.map((move,index)=>{
            // console.log(move)
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
                {/* <!-- Player Card--> */}
                <div className="characterbox" id="player1">
                    <div className="char" >
                        <h2>{player.name}</h2>
                    </div>
                    <progress id="hpBar" value={this.state.player.hp} max='100'></progress>
                    {this.state.currentTurn === 'Player' ? 
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
                {/* <!-- Enemy Card--> */}
                <div className="characterbox" id="playerC">
                    <div className="char" >
                        <h2>{enemy.name}</h2>
                    </div>
                    <progress id="hpBar" value={this.state.enemy.hp} max='100'></progress>
                    {this.state.currentTurn ==='Comp' 
                        ? <button className="action" id="randAction" onClick={this.fullCompTurn}>Comp Action</button> 
                        : this.state.disabled
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