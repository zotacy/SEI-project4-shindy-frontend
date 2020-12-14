import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './GameScreen.css';

class GameLogic extends Component{
    render(){
        let turn ='Comp'
        let moves = ["","","","","","","","",""];
        let counter = 0;
        
        //Cell Array, addEventListeners & cellClick function
        function cellClick(){
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

        function winLogic(){
            if (
        };
    }
}
    


     