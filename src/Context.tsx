import {createContext, useReducer} from "react";
import {useEffect,useState} from "react";


let turn : "X" | "O" = "X";
let winner : "X" | "O" | "DRAW"|null = null;
let turnCount : number =0;

const done:Array<Array<number>> = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]



type action = {turn : "X" | "O" , position : number};
type boardType = Array<string|null>;

const board:boardType = Array(9).fill(null);

const stateContext = createContext<boardType|undefined>(undefined);
const dispatchContext = createContext<React.Dispatch<action>| undefined> (undefined);


function reducer(state: boardType, action :action): boardType {
    state[action.position] = action.turn;
    if(action.turn==='X'){
        turn = "O";
    }else {
        turn = "X";
    }

    let result = resultCheck(state);

    if(result==='X'){
        winner = "X";
    }else if(result==='O'){
        winner = "O";
    }else if(result===null && turnCount===9){
        winner = "DRAW";
    }

    return state;
}


function resultCheck(state: boardType): "X" | "O" | null{
    for(let i=0;i<done.length;i++){
        const [a,b,c] = done[i];
        if(state[a] && state[a]===state[b] && state[b]===state[c]){
            return state[a] as "X" | "O"
        }
    }
    return null;
}




export function Context({children}:{children:React.ReactNode}){

    const [state,dispatch] = useReducer(reducer,board);

    const [gameOver,setGameOver] = useState(false);

    useEffect(()=>
    {
        if(winner){
            setGameOver(true);
        }
    },[winner])

    return (
        <stateContext.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </stateContext.Provider>
    )
}