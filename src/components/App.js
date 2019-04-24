import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'

import fields from '../../fields.json'
import Score from './Score'
import theme from './theme'
import chunk from 'lodash/chunk'
import Dialog from './Dialog'

export const GAME_INITIAL_STATE = {
  score: {
    balance: 986,
    spent: 0,
    mobility: 0,
    clothing: 0,
    leisure: 0,
    media: 0,
    general: 0,
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

  const appRef = useRef(null)
  const boardRef = useRef(null)

  const fieldData = fields.data

  const [gameState, setGameState] = useState(GAME_INITIAL_STATE)
  
  const gameData = fieldData.slice(0,96).map(d => {
    if (d.dependency) {
      const isRejected = gameState.transactions.rejected.some(e => e.id === d.dependency)
      let replacement = fieldData.find(e => e.id === d.altYes)
      if (isRejected) {
        replacement = fieldData.find(e => e.id === d.altNo)
      }
      return { ...replacement, id: d.id }
    } else {
      return d
    }
  })

  const fieldDataChunks = chunk(gameData, 16)
  // display last 4 old fields while on first 5 fields of round
  let displayData = (gameState.round > 1 && (gameState.activeField + gameState.round - 1) % 17 < 5)
    ? fieldDataChunks[gameState.round - 1].slice(0, 12).concat(fieldDataChunks[gameState.round - 2].slice(12, 16))
    : fieldDataChunks[gameState.round - 1]

  const currentFieldIdx = gameState.activeField - 1
  const currentField = fieldData[currentFieldIdx]

  const width = centerWidth + 2 * marginWidth
  const zoomScale = scaleLinear().domain([0,1000]).range([0.8,0.5])
  zoomScale.clamp(true)
  const maxCornerFieldHeight = 300
  const cornerFieldHeight = Math.min(centerWidth*zoomScale(width), maxCornerFieldHeight)
  const boardSize = cornerFieldHeight*4
  const boardOffsetX = marginWidth-boardSize/2-boardSize/4+(centerWidth-cornerFieldHeight)/2
  const boardOffsetY = -boardSize+height*0.9

  const advanceGame = (field, reject = false) => {

    appRef.current && appRef.current.scrollIntoView()

    const accepted = field.id > 0 && (field && !reject) ? gameState.transactions.accepted.concat(field) : gameState.transactions.accepted
    const rejected = (field && reject) ? gameState.transactions.rejected.concat(field) : gameState.transactions.rejected
    
    const sumTransactions = (category) => accepted.filter(t => t.category === category).reduce((acc,cur) => acc + cur.amount, 0)

    const general = accepted.concat(rejected).reduce((acc,cur) => acc + cur.pauschal, 0)
    const start = sumTransactions('start')
    const mobility = sumTransactions('mobility')
    const clothing = sumTransactions('clothing')
    const leisure = sumTransactions('leisure')
    const media = sumTransactions('media')
    const balance = start + general + mobility + clothing + leisure + media
    const spent = Math.abs(Math.min(balance - start, 0))

    setGameState({
      ...gameState,
      transactions: {
        accepted,
        rejected,
      },
      score: {
        balance,
        spent,
        general,
        mobility,
        clothing,
        leisure,
        media
      },
      round: (gameState.activeField > 0 && gameState.activeField % 16 === 0) ? gameState.round + 1 : gameState.round,
      activeField: gameState.activeField + 1
    })
  }

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

  const gamePaused = currentFieldIdx > 0 && currentField.type === 'chance'
  const gameOver = gameState.score.balance < 0

  return (
    <div ref={appRef} style={{position: 'relative'}}>
      <div style={{ position: 'absolute', width, height}}>
        <div style={{position: 'relative', marginLeft: marginWidth, width: centerWidth}}>
          <Score gameState={gameState} field={currentField} setGameState={setGameState} boardSize={boardSize} width={centerWidth} />
          <Dialog boardSize={boardSize} width={centerWidth} height={height} field={currentField} advanceGame={advanceGame} show={gamePaused}/>
        </div>
        <svg width={width} height={height} style={{background: theme.background}} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${boardOffsetX}, ${boardOffsetY})`}>
            <g ref={boardRef}>
              <Board boardSize={boardSize} fields={displayData} gameState={gameState}/>
            </g>
          </g>
          <circle opacity={0.3} cx={marginWidth + centerWidth * 0.5} cy={height*0.7} r={50} fill={'#000'}  onClick={() => !gamePaused && advanceGame(currentField) } />
          {/*<rect x={marginWidth} y={0} width={centerWidth} height={height} fill={'none'} stroke={'#000'} />*/}
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
