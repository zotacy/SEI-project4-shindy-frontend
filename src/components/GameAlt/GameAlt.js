// Code retrieved from https://www.codementor.io/@danielmbfm/a-react-rpg-game-ehxpd4p4q
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './GameAlt.css';

const MenuContainer = props => <div className="menu" {...props}></div>

class MenuSelect extends React.Component {
  constructor(props) {
    super(props)
    this.itemRefs = []
    this.state = {
      selected: this.props.selected || 0,
      handTop: 0,
      handLeft: 0
    }
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  componentDidMount() {
    let selectedElement = this.itemRefs[this.state.selected]
    this.setState({      
      handTop: selectedElement.offsetTop
    })
    window.addEventListener('keydown', this.onKeyDown)
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown(e) {
    if (!this.props.active) {
      return
    }
    let inc = true
        
    if (e.keyCode == '40') {      
      inc = true
    } else if (e.keyCode == '38') {      
      inc = false
    } else if ( (e.keyCode == '13') || (e.keyCode == '32') ) {
      if (this.props.onChoice) { 
        this.props.onChoice(this.state.selected)
      }
      return
    } else {      
      return
    }
    
    this.setState(state => {
      let selected = inc ?
          (state.selected + 1) % this.props.items.length :
          (state.selected == 0 ?
            (this.props.items.length - 1) : ((state.selected - 1) % this.props.items.length) )

      let handTop =  this.itemRefs[selected].offsetTop
      
      return { selected, handTop }         
     })
    
    e.preventDefault()
  }
    
  render() {
    return (
        <MenuContainer           
          style={{...this.props.style, paddingLeft: '44px'}}>
        {
          this.props.items.map( (item, index) => 
            <div 
              className="menu_item_wrapper" 
              style={this.props.itemStyle}              
              ref={e => this.itemRefs[index] = e}
              key={index}>
             { this.props.renderItem(item, index) }
            </div>
          )
        }
        {
          this.props.active ?
          <div className="menu_hand" style={{ top: this.state.handTop, left: this.state.handLeft }}>
            <img src="http://res.cloudinary.com/forte-3d/image/upload/v1512749704/hand_gkm8wr.png"/>
          </div>  : null
        }
        </MenuContainer>        
     )
  }
      
}

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

//////// State and state functions
const initialState = () => ({
  isRunning: false,
  playerStats: {
    hp: 100,
    maxHp: 100,
    time: 7000,
    attack: 25,
    defense: 5,
    name: "Player"
  },
  enemyStats: {
    hp: 100,
    maxHp: 100,
    time: 4000,
    attack: 25,
    defense: 5,
    name: "Opponent"
  },
  isPlayerTurn: false
})

const setIsRunning = setProp('isRunning')
const setIsPlayerTurn = setProp('isPlayerTurn')
const setPlayerHp = setProp2('playerStats')('hp')
const setEnemyHp =  setProp2('enemyStats')('hp')
const resetState = () => ({...initialState})

//////// Start Screen
const Start = ({ start }) =>
  <MenuSelect
    active={true}
    onChoice={start}
    items={["Start Game"]}
    renderItem={ item => <span>{item}</span> }
    >
  </MenuSelect>

//////// Game component
const styles = {
  mainMenuStyle: {
    flex: 1
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.initialState ? {...this.props.initialState} : {...initialState()}
  }
  
  onStart() {
    this.setState(setIsRunning(true))
  }

  onPlayerTurn() {
    this.setState(setIsPlayerTurn(true))
  }
  
  endGame() {
    this.setState(state => initialState())
  }
  
  onEnemyTurn() {
    let newHp = this.getNewHp(this.state.enemyStats, this.state.playerStats)
    if (newHp <= 0) {
      this.endGame()
      return
    }
    console.log("enemy", newHp)
    this.setState(setPlayerHp(newHp))
  }
  
  getNewHp(from, to) {
    let seed = Math.random()
    //let damage = Math.floor(Math.max(0, Math.abs(from.attack  - to.defense) * seed))
    let damage = Math.floor(seed * ( (50 - to.defense/4) + Math.max(0, from.attack  - to.defense)/2)) 
    return to.hp - damage
  }
  
  playerAttack() {  
      let newHp = this.getNewHp(this.state.playerStats, this.state.enemyStats)
      if (newHp <= 0) {
        this.endGame()
        return
      }
      this.setState(state => setIsPlayerTurn(false)(setEnemyHp(newHp)(state)))
      
    }
  // Main Screen
  render() {
    if (!this.state.isRunning) {
      return (
        <div className="game-wrapper">                
          <Start start={this.onStart.bind(this)} />        
        </div>
      )
    }        
    
    return (
      <div className="game-wrapper">        
        <div className="main-game">          
          <MenuSelect
            style={styles.mainMenuStyle}
            active={this.state.isPlayerTurn}
            items={['Attack'],['Block'],['Recover'],['Trickery']}
            onChoice={this.playerAttack.bind(this)}
            renderItem={item => <span>{item}</span>} />
          <MenuSelect
            style={styles.mainMenuStyle}
            active={false}
            items={[this.state.playerStats, this.state.enemyStats]}
            renderItem={stats =>
              <div style={{height: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <span style={{flex: 1}}>{stats.name}</span>
                <TimerBar 
                  style={{flex: 1}} 
                  duration={stats.time}
                  onComplete={ (stats.name === 'player') ? this.onPlayerTurn.bind(this) : this.onEnemyTurn.bind(this) }
                  paused={ stats.name === 'player' && this.state.isPlayerTurn }
                  />
                <span style={{flex: 2, textAlign: 'right'}}> {stats.hp}/{stats.maxHp} HP </span>
              </div>
            }
            >
            
          </MenuSelect>          
        </div>
      </div>
    )    
  }  
}


//////// Timer bar
class TimerBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: props.duration,
      elapsed: 0
    }
    this.interval = null;
  }
  
  componentDidMount() {
    this.last = performance.now()
    this.interval = setInterval(() => {
      this.setState(state => {
        if (this.props.paused) {
          this.last = performance.now()
          return
        }
  
        let now = performance.now()
        let elapsed = state.elapsed + (now - this.last)
        this.last = now
        
        if (elapsed >= state.duration) {
          if (this.props.onComplete) {
            this.props.onComplete()
          }
          return { elapsed: 0 }
        } else {
          return { elapsed }
        }        
      })
    }, 100)
  }
  
  render() {
    return (
      <div className="timer-bar" style={this.props.style}>
        <span style={{
            width: (100 * this.state.elapsed / this.state.duration) + '%', 
              height: '100%' }}>
        </span>
      </div>
    )
  }
}

//////// Render to DOM
// ReactDOM.render(<Game />, document.getElementById('game'))
export default Game;