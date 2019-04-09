import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import Score from './Score'
import { GAME_INITIAL_STATE } from './App'

const ScoreStory = (props) => {

  const [ gameState, setGameState ] = useState(GAME_INITIAL_STATE)

  return(
    <div style={{position: 'absolute'}}>
      <Score {...props} gameState={gameState} setGameState={setGameState}/>
    </div>
  )

}

storiesOf('Score', module)
  .add('default',
    () => <ScoreStory width={500} boardSize={800} />
  )
