import React, { useState, useRef, useEffect } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select  } from 'd3-selection'
import { easeLinear, easeCubic, easeElastic, easeExpIn, easeCircle } from 'd3-ease'

import fields from '../../fields'
import { GAME_INITIAL_STATE } from './constants'

const dα = 360 / 16

const App = () => {

  const [ gameState, setGameState ] = useState(GAME_INITIAL_STATE)

  const advanceGame = () => setGameState({
    ...gameState,
    round: (gameState.activeField > 0 && gameState.activeField % 16 === 0) ? gameState.round+1 : gameState.round,
    activeField: gameState.activeField+1
  })

  const [ rotation, setRotation ] = useState(0)
  const boardRef = useRef(null)

  useEffect(
    () => {
      gameState.activeField > 0 && select(boardRef.current).transition().attr('transform', `rotate(${-gameState.activeField * dα}, ${boardSize/2}, ${boardSize/2})` ).ease(easeCircle)
    }
  )

  const width = 400, height = 600
  const boardSize = 800

  const rotationAxis = boardSize / 2 - boardSize / 4 + ( (width - boardSize / 4) / 2 )

  return (
    <div style={{position: 'relative', width, height}} onTouchStart={advanceGame} onWheel={advanceGame}>
      <svg width={width} height={height} style={{background: '#444'}}>
        <g transform={`translate(${-boardSize+rotationAxis}, ${-boardSize+rotationAxis+height/3})`}>
          <g ref={boardRef}>
            <Board boardSize={boardSize} fields={fields.data} />
          </g>
        </g>
      </svg>
    </div>
  )

}


export default App
