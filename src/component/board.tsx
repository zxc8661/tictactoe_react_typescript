import React from 'react'
import {useGameState, useGameDispatch} from '../Context'
import Tail from './tail';




export default function Board(){
    const {board,gameOver} = useGameState();


    return (
        <div className = "board">
            {board.map((cell,i)=>(
                 <Tail
                 key={i}
                 value={cell}
                 position={i}
                 disabled={gameOver || cell !== null}
               />
            ))}
        </div>
    )
}
