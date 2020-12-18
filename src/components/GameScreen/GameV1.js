// Code retrieved from https://www.codementor.io/@danielmbfm/a-react-rpg-game-ehxpd4p4q
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
    playerStats: {
      name: "Player",
      maxHp: 100,
      hp: 100,
      attack: 25,
      defense: 5,
      recover:10,
      spd:1,
      time: 7000,
    },
    enemyStats: {
        name: "Opponent",
        maxHp: 100,
        hp: 100,
        attack: 25,
        defense: 5,
        recover:10,
        spd:1,
        time: 4000,
    },
    moveHistory:[],
    isPlayerTurn: false,
    isRunning: false,
  })

const setIsRunning = setProp('isRunning')
const setIsPlayerTurn = setProp('isPlayerTurn')
const setPlayerHp = setProp2('playerStats')('hp')
const setEnemyHp =  setProp2('enemyStats')('hp')
const resetState = () => ({...initialState})

//////// Game Logic
class Game extends Component{
    constructor(props){
        super(props)
        this.state = this.props.initialState ? {...this.props.initialState} : {...initialState()}
    }
    /// Start, Change playerTurn, End
    onStart=()=> {this.setState(setIsRunning(true))}
    onPlayerTurn() {this.setState(setIsPlayerTurn(true))}
    onEnemyTurn() {
        let newHp = this.getNewHp(this.state.enemyStats, this.state.playerStats)
        if (newHp <= 0) {
          this.endGame()
          return
        }
        console.log("enemy", newHp)
        this.setState(setPlayerHp(newHp))
    }
    endGame() {this.setState(state => initialState())}

    /// Turns
    playerAction() {  
        let newHp = this.getNewHp(this.state.playerStats, this.state.enemyStats)
        if (newHp <= 0) {
          this.endGame()
          return
        }
        this.setState(state => setIsPlayerTurn(false)(setEnemyHp(newHp)(state))) 
      }
    getNewHp(from, to) {
        let seed = Math.random()
        //let damage = Math.floor(Math.max(0, Math.abs(from.attack  - to.defense) * seed))
        let damage = Math.floor(seed * ( (50 - to.defense/4) + Math.max(0, from.attack  - to.defense)/2)) 
        return to.hp - damage
    }

    // Action Methods
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

    ///Render
    render(){
        // if (!this.state.isRunning) {
        //     return (
        //       <div className="game-wrapper">                
        //         <button start={this.onStart.bind(this)}>Start</button>        
        //       </div>
        //     )
        // } 
        let moveHistory= this.state.moveHistory.map((move,index)=>{
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
        
        return (
            <main className="gameMain">
            <div className="gameScreen">
                {/* <!-- Player --> */}
                <div className="characterbox" id="player1">
                    <div className="char" >
                        <h2>{this.state.playerStats.name}</h2>
                        <progress id="hpBar" value={this.state.playerStats.hp} max='100'></progress>
                    </div>
                    {this.state.playerTurn ? 
                        <div className="actionbox">
                            <button className="action" id="attack" onmousedown={this.attack} onmouseup={this.playerAction}>Attack!</button>
                            <button className="action" id="defend" onmousedown={this.block} onmouseup={this.playerAction}>Block</button>
                            <button className="action" id="recover" onmousedown={this.recover} onmouseup={this.playerAction}>Recover</button>
                            <button className="action" id="trick" onmousedown={this.trickery} onmouseup={this.playerAction}>Trickery</button>
                        </div>
                    : this.state.disabled || this.state.isRunning===false
                    }
                </div>
                    {/* <!-- Middle Space --> */}
                <div className="middle-space">
                    <h1 id="play" onClick={this.onStart}>Play</h1>
                </div>
                {/* <!-- Computer --> */}
                <div className="characterbox" id="playerC">
                    <div className="char" >
                        <h2>{this.state.enemyStats.name}</h2>
                        <progress id="hpBar" value={this.state.enemyStats.hp} max='100'></progress>
                    </div>
                    {this.state.playerTurn || this.state.isRunning===false ? this.state.disabled :
                        <div className="actionbox">
                            <button>Opponent's turn</button>
                            {/* {this.state.enemyAction} */}
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

export default Game;