import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import Score from './Score'
import { GAME_INITIAL_STATE } from './App'

import fields from '../../fields.json'

const ScoreStory = (props) => {

  const [ gameState, setGameState ] = useState({...GAME_INITIAL_STATE, transactions: { accepted: fields.data, rejected: [] }})


  return(
    <div style={{position: 'absolute'}}>
      <Score {...props} field={fields.data[23]} gameState={gameState} setGameState={setGameState}/>
    </div>
  )

}

storiesOf('Score', module)
  .add('default',
    () => <ScoreStory width={500} boardSize={800} />
  )
