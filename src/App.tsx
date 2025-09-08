import Tamplate from './component/Tamplate';
import Board from './component/board';
import { Context } from './Context';
import './App.css';
import ResetButton from './component/ResetButton';
import Bottom from './component/Bottom';
import SituationBoard from './component/SituationBoard';





export default function App(){
  return (
    <Context>
     <Tamplate >
      <Board/>
      <Bottom>
       <ResetButton/>
       <SituationBoard/>
      </Bottom>
     </Tamplate>
    </Context>

  )
}