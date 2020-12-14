import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './GameScreen.css';

class GameLogic extends Component{
    render(){
        let turn ='Comp'
        let moves = ["","","","","","","","",""];
        let counter = 0;
        
        //Cell Array, addEventListeners & cellClick function
        turnLogic=()=>{
            if (turn == 'comp' && this.classList.contains('clicked') == false){
                this.classList.add('clicked')
                moves[this.id] = turn;
                winLogic()
                counter ++;
                turn = 'player'
            } else if (turn == 'player' && this.classList.contains('clicked') == false){
                this.classList.add('clicked')
                moves[this.id] = turn;
                winLogic()
                counter ++;
                turn ='comp'
            };
        };

        winLogic=()=>{
            if (this.props.player.hp === 0){
                alert("You won")
                // this.props.endGame()
            } else if (this.props.computer.hp === 0){
                alert("You have been defeated")
                // this.props.endGame()
            } else {
                // this.props.nextTurn()
            }
        };
    }
}
    


     