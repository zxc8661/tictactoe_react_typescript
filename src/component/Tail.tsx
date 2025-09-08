import { useGameDispatch, useGameState,  } from "../Context";

type Cell = "X" | "O" | null;

interface TailProps{
    value: Cell;
    position: number;
    disabled: boolean;
}


export default function Tail({value,position,disabled}: TailProps){
    const dispatch = useGameDispatch();

    const handleClick =() =>{
        if(disabled) return;
        dispatch({type :"PLACE", position : position})
    }

    return (
        <button className = "tail" disabled={disabled} onClick = {()=>{handleClick()}}>
            {value===null?"":value}
        </button>
    )
}