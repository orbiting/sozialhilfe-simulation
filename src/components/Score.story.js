import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import Score from './Score'
import { GAME_INITIAL_STATE } from './App'

const ScoreStory = (props) => {

  const [ gameState, setGameState ] = useState(GAME_INITIAL_STATE)

  return <Score {...props}  gameState={gameState} setGameState={setGameState} />

}

storiesOf('Score', module)
  .add('default',
    () => <svg width={500} height={500}><ScoreStory width={500} boardSize={800} /></svg>
  )
