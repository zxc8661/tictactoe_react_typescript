import { useGameState } from "../Context";


export default function SituationBoard(){
    const state = useGameState();


    return (
        <div className = "situationBoard">
            {state.winner === "DRAW" ? "Draw" : state.winner === null ? "This turn is " +state.turn : state.winner + " is winner"}
        </div>
    )
  
}