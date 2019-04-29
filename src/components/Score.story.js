import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Score from './Score'
import { getInitialState } from './App'

import fields from '../../fields.json'

const ScoreStory = props => {
  const [gameState, setGameState] = useState({
    ...getInitialState(),
    transactions: fields.data.map(d => ({ reject: false, field: d })),
  })

  return (
    <div style={{ position: 'absolute' }}>
      <Score
        gameState={gameState}
        field={fields.data[23]}
        setGameState={setGameState}
        boardSize={800}
        height={800}
        width={400}
        started={true}
      />
    </div>
  )
}

storiesOf('Score', module).add('default', () => (
  <ScoreStory width={500} boardSize={800} />
))
