import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'

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

const App = ({centerWidth, marginWidth, height}) => {

  const fieldData = fields.data
  const fieldDataChunks = chunk(fields.data, 16)

  const boardRef = useRef(null)

  const [gameState, setGameState] = useState(GAME_INITIAL_STATE)
  //useState({...GAME_INITIAL_STATE, transactions: { accepted: fieldData.slice(0,1) }})


  // display last 4 old fields while on first 5 fields of round
  const displayData = (gameState.round > 1 && (gameState.activeField + gameState.round - 1) % 17 < 5)
    ? fieldDataChunks[gameState.round - 1].slice(0, 12).concat(fieldDataChunks[gameState.round - 2].slice(12, 16))
    : fieldDataChunks[gameState.round - 1]

  const currentFieldIdx = gameState.activeField - 1
  const currentField = fieldData[currentFieldIdx]
  const gamePaused = currentField.type === 'chance'

  const width = centerWidth + 2 * marginWidth
  const zoomScale = scaleLinear().domain([0,1000]).range([0.8,0.5])
  zoomScale.clamp(true)
  console.log('App.js:54 [zoomScale(width)]', zoomScale(width))
  const cornerFieldHeight = centerWidth*zoomScale(width)
  const boardSize = cornerFieldHeight*4
  const boardOffsetX = marginWidth-boardSize/2-boardSize/4+(centerWidth-cornerFieldHeight)/2
  const boardOffsetY = -boardSize+height*0.9

  const advanceGame = (field, reject = false) => setGameState({
    ...gameState,
    transactions: {
      accepted: (field && !reject) ? gameState.transactions.accepted.concat(field) : gameState.transactions.accepted,
      rejected: (field && reject) ? gameState.transactions.rejected.concat(field) : gameState.transactions.rejected,
    },
    round: (gameState.activeField > 0 && gameState.activeField % 16 === 0) ? gameState.round + 1 : gameState.round,
    activeField: gameState.activeField + 1
  })

  useEffect(
    () => {
      const dx = cornerFieldHeight/2 * Math.abs(Math.sin(((gameState.activeField - 1) * dα * 2) * Math.PI / 180))
      const dy = -height * 0.1 * Math.abs(Math.sin(((gameState.activeField - 1) * dα * 2) * Math.PI / 180))

      gameState.activeField && select(boardRef.current)
        .transition()
        .attr('transform', `translate(${dx}, ${dy}) rotate(${-(gameState.activeField - 1) * dα}, ${boardSize / 2}, ${boardSize / 2})`)//.ease(easeCircle)
    },
    [gameState]
  )


  return (
    <div style={{position: 'relative'}}>
      <div style={{ position: 'absolute', width, height }}>
        {/*<div style={{position: 'relative'}}>*/}
        {/*  <Score gameState={gameState} setGameState={setGameState} boardSize={boardSize} width={width}/>*/}
        {/*</div>*/}
        <Dialog boardSize={boardSize} size={width} field={currentField} fieldIdx={currentFieldIdx}
                advanceGame={advanceGame} show={gamePaused}/>
        <svg width={width} height={height} style={{background: theme.background}}>
          <g transform={`translate(${boardOffsetX}, ${boardOffsetY})`}>
            <g ref={boardRef}>
              <Board boardSize={boardSize} fields={displayData} gameState={gameState}/>
            </g>
          </g>
          <circle opacity={0.3} cx={marginWidth + centerWidth * 0.5} cy={height*0.7} r={centerWidth*0.1} fill={'#000'}  onClick={() => advanceGame(currentField) } />
          <rect x={marginWidth} y={0} width={centerWidth} height={height} fill={'none'} stroke={'#000'} />
        </svg>
      </div>
    </div>
  )

}

App.defaultProps = {
  centerWidth: 400,
  marginWidth: 50,
  height: 700,
}

export default App
