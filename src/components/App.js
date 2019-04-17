import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'

import fields from '../../fields'
import Score from './Score'
import theme from './theme'
import chunk from 'lodash/chunk'
import Dialog from './Dialog'
import { Container, NarrowContainer, Center, Editorial } from '@project-r/styleguide'

export const GAME_INITIAL_STATE = {
  score: {
    balance: 986,
    budget: {
      leisure: 0.333,
      mobility: 0.333,
      media: 0.333,
    },
  },
  transactions: {
    accepted: [],
    rejected: [],
  },
  round: 1,
  activeField: 1
}

const dα = 360 / 16

const App = ({fullscreen}) => {

  const fieldData = fields.data
  const fieldDataChunks = chunk(fields.data, 16)

  const boardRef = useRef(null)
  const gameRef = useRef(null)

  const [size, setSize] = useState({width: 300, height: 600})
  const [gameState, setGameState] = useState(GAME_INITIAL_STATE)
  //useState({...GAME_INITIAL_STATE, transactions: { accepted: fieldData.slice(0,1) }})

  const advanceGame = (field, reject = false) => setGameState({
    ...gameState,
    transactions: {
      accepted: (field && !reject) ? gameState.transactions.accepted.concat(field) : gameState.transactions.accepted,
      rejected: (field && reject) ? gameState.transactions.rejected.concat(field) : gameState.transactions.rejected,
    },
    round: (gameState.activeField > 0 && gameState.activeField % 16 === 0) ? gameState.round + 1 : gameState.round,
    activeField: gameState.activeField + 1
  })

  const measure = () => {
    if (fullscreen) {
      setSize({width: window.innerWidth, height: window.innerHeight})
    } else if (gameRef.current) {
      const bbox = gameRef.current.getBoundingClientRect()
      setSize(bbox)
    }
  }

  useEffect(
    () => { measure() }, []
  )
  useEffect(
    () => {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
  )

  useEffect(
    () => {
      const dx = Math.floor(width / 3.5 * Math.abs(Math.sin(((gameState.activeField - 1) * dα * 2) * Math.PI / 180)))
      gameState.activeField && select(boardRef.current)
        .transition()
        .attr('transform', `translate(${dx}, ${0}) rotate(${-(gameState.activeField - 1) * dα}, ${boardSize / 2}, ${boardSize / 2})`)//.ease(easeCircle)
    },
    [gameState]
  )

  const position = fullscreen
    ? {position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}
    : {position: 'relative', ...size}

  const {width, height} = size
  const boardSize = 2.5 * width
  const rotationAxis = boardSize / 2 - boardSize / 4 + ((width - boardSize / 4) / 2)

  // display last 4 old fields while on first 5 fields of round
  const displayData = (gameState.round > 1 && (gameState.activeField + gameState.round - 1) % 17 < 5)
    ? fieldDataChunks[gameState.round - 1].slice(0, 12).concat(fieldDataChunks[gameState.round - 2].slice(12, 16))
    : fieldDataChunks[gameState.round - 1]

  const currentFieldIdx = gameState.activeField - 1
  const currentField = fieldData[currentFieldIdx]
  const gamePaused = currentField.type === 'chance'

  return (
    <div style={{position: 'relative'}}>
      <div ref={gameRef} style={position}>
        <div style={{position: 'relative'}}>
          <Score gameState={gameState} setGameState={setGameState} boardSize={boardSize} width={width}/>
        </div>
        <Dialog boardSize={boardSize} size={width} field={currentField} fieldIdx={currentFieldIdx}
                advanceGame={advanceGame} show={gamePaused}/>
        <svg width={width} height={height} style={{background: theme.background}}>
          <g transform={`translate(${-boardSize + rotationAxis}, ${-boardSize + rotationAxis + height / 2})`}>
            <g ref={boardRef}>
              <Board boardSize={boardSize} fields={displayData} gameState={gameState}/>
            </g>
          </g>
          <circle opacity={0.3} cx={width * 0.5} cy={height*0.7} r={width*0.1} fill={'#000'}  onClick={() => !gamePaused && advanceGame(currentField) } />
        </svg>
      </div>
    </div>
  )

}

App.defaultProps = {
  fullscreen: false
}

export default App
