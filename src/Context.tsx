import {createContext, useContext, useReducer} from "react";



export type Cell = "X" | "O" | null;
type Winner = "X" | "O" | "DRAW"|null;

interface GameState{
    board : Cell[];
    turn : "X" | "O";
    winner :   Winner;
    turnCount : number;
    gameOver : boolean;
    
}



const LINES:Array<Array<number>> = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]




type Action =
    {type:"PLACE" ; position : number}|
    {type: "RESTART"}




function checkWinner(board: Cell[]): Winner{
    for (const [a,b,c] of LINES){
        if(board[a] && board[a]===board[b] && board[b]===board[c]){
            return board[a] ;
        }
    }
    return null;
}


function createInitialState(): GameState{
    return {
        board : Array(9).fill(null),
        turn : "X",
        winner : null,
        turnCount : 0,
        gameOver :false,
    }
}


function reducer (state: GameState, action :Action): GameState{
    switch(action.type){
        case "PLACE":
            const position = action.position;

            if(state.board[position]!==null || state.gameOver){
                return state;
            }

            const newBoard = state.board.slice();
            newBoard[position] = state.turn;
            
            const maybeWinner = checkWinner(newBoard);
            const turnCount = state.turnCount +1;
            const isDraw = turnCount ===9 && maybeWinner ===null;

            return {
                board :newBoard,
                turn : maybeWinner || isDraw ? state.turn : state.turn ==="X" ? "O" : "X", //????????????
                winner: maybeWinner ? maybeWinner : isDraw ? "DRAW" : null,//????????????
                turnCount : turnCount,
                gameOver : Boolean(maybeWinner||isDraw),
            }
        case "RESTART":
            return createInitialState();
        default:
            return state;
    }
}

/*
1. context 생성
각각GameState 와 Action을 공급한다.
이런식으로 상태와 디스패치를 분리하면, 상태만 필요할 경우 디스패치 변경에 리랜더링 되지 않고 불필요한 리랜더링을 방지할 수 있다.
- 공급?
- context 란?
*/
const StateContext = createContext<GameState|undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action>| undefined> (undefined);

/*
1.reducer 호출
- state : 개임 상태, dispatch : 액션을 리듀서로 전달하는 함수
2. Provider 구조
- Context 컴포넌트로 감싸고 있는 하위 컴포넌트들은 Context 값을 읽어올 수 있다.

- dispatch?
- reducer?
*/
export function Context({children}:{children:React.ReactNode}){

    const [state,dispatch] = useReducer(reducer,createInitialState()); // 첫번째 인자 : context 의 상태를 변화시키는 함수, 두번째 인자 : context 의 초기 상태

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}




export function useGameState(){
    const ctx = useContext(StateContext);
    if( ctx===undefined) throw new Error("useGameState must be used within a Context");
    return ctx;
}

export function useGameDispatch(){
    const ctx = useContext(DispatchContext);
    if( ctx===undefined) throw new Error("useGameDispatch must be used within a Context");
    return ctx;
}