import { useGameDispatch, useGameState } from "../Context";


export default function ResetButton(){
    const state = useGameState();

    const dispatch = useGameDispatch();


    const handleClick =() =>{
        dispatch({type: "RESTART"})
    }


    return (
        <button className = "resetButton" onClick = {()=>{handleClick()}}>
            Reset
        </button>
    )
}