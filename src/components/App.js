import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'

import fields from '../../fields'
import Score from './Score'

export const GAME_INITIAL_STATE = {
  score: {
    balance: 986,
    budget: {
      leisure: 0.333,
      mobility: 0.333,
      media: 0.333,
    },
  },
  round: 0,
  activeField: 0
}

const dα = 360 / 16

const App = () => {

  const [ gameState, setGameState ] = useState(GAME_INITIAL_STATE)

  const advanceGame = () => setGameState({
    ...gameState,
    round: (gameState.activeField > 0 && gameState.activeField % 16 === 0) ? gameState.round+1 : gameState.round,
    activeField: gameState.activeField+1
  })

  const setScore = score => setGameState({...gameState, score})

  const boardRef = useRef(null)

  useEffect(
    () => {
      const dx = Math.floor(width/3.5*Math.abs(Math.sin((gameState.activeField*dα*2)*Math.PI/180)))
      gameState.activeField > 0 && select(boardRef.current)
        .transition()
        .attr('transform', `translate(${dx}, ${0}) rotate(${-gameState.activeField*dα}, ${boardSize/2}, ${boardSize/2})` )//.ease(easeCircle)
    }
  )

  const width = 300, height = 600
  const boardSize = 800

  const rotationAxis = boardSize / 2 - boardSize / 4 + ( (width - boardSize / 4) / 2 )

  return (
    <div style={{position: 'relative', width, height}} onTouchStart={advanceGame} onClick={advanceGame}>
      <svg width={width} height={height} style={{background: '#444'}}>
        <g transform={`translate(${-boardSize+rotationAxis}, ${-boardSize+rotationAxis+height/2})`}>
          <g ref={boardRef}>
            <Board boardSize={boardSize} fields={fields.data} />
          </g>
        </g>
        <Score gameState={gameState} setGameState={setGameState} boardSize={boardSize} width={width} />
      </svg>
    </div>
  )

}


export default App
