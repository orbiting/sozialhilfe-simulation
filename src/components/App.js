import React, { useEffect, useRef, useState, useMemo } from 'react'

import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { easeCubicIn } from 'd3-ease'
import { Swipeable } from 'react-swipeable'

import fields from '../../fields.json'
import fields2 from '../../fields2.json'
import fields3 from '../../fields3.json'
import Score from './Score'
import theme from './theme'
import chunk from 'lodash/chunk'
import Dialog from './Dialog'
import GameOver from './GameOver'
import memoize from 'lodash/memoize'

const dα = 360 / 16

export const getInitialState = memoize((avatar) => ({
  tryAgain: false,
  balance: avatar ? avatar.startingBalance : 986,
  transactions: [],
  round: 1,
  activeField: 1,
  avatar: undefined,
}))

const App = ({
  centerWidth,
  marginWidth,
  height,
  mobile,
  avatar,
  started
}) => {

  const appRef = useRef(null)
  const boardRef = useRef(null)
  const buttonRef = useRef(null)

  const [gameState, setGameState] = useState(getInitialState(avatar))
  const currentFieldIdx = gameState.activeField - 1

  let fieldData

  switch (avatar ? avatar.id : undefined) {
    case 0:
      fieldData = gameState.tryAgain ? fields2.data : fields.data
      break;
    case 1:
      fieldData = fields3.data
      break;
    default:
      fieldData = []
      break;
  }

  const currentField = fieldData[currentFieldIdx]

  // replace events with replacements
  const gameData = fieldData.slice(0, 96).map(d => {
    if (d.dependency) {
      const isRejected = gameState.transactions.some(
        t => t.reject && (t.field.id === d.dependency)
      )
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
  let displayData =
    gameState.round > 1 &&
    (gameState.activeField + gameState.round - 1) % 17 < 5
      ? fieldDataChunks[gameState.round - 1]
          .slice(0, 12)
          .concat(fieldDataChunks[gameState.round - 2].slice(12, 16))
      : fieldDataChunks[gameState.round - 1]


  // calculate sizes
  const width = centerWidth + 2 * marginWidth
  const zoomScale = scaleLinear()
    .domain([0, 1000])
    .range([0.85, 0.5])
  zoomScale.clamp(true)
  const maxCornerFieldHeight = 300
  const cornerFieldHeight = Math.min(
    centerWidth * zoomScale(width),
    maxCornerFieldHeight,
  )
  const boardSize = cornerFieldHeight * 4
  const boardOffsetX =
    marginWidth -
    boardSize / 2 -
    boardSize / 4 +
    (centerWidth - cornerFieldHeight) / 2
  const boardOffsetY = -boardSize + height * 0.9

  // game status
  const gameOver =
    currentFieldIdx === 95 || gameState.balance < 0
  const gamePaused =
    currentFieldIdx > 0 && currentField.type === 'chance'

  // move to next field
  const advanceGame = (field, reject = false) => {
    const transactions = [ ...gameState.transactions, { field, reject } ]
    const balance = transactions.filter(({reject}) => !reject).reduce((acc,cur) => acc + cur.field.amount + cur.field.pauschal, 0)
    setGameState({
      ...gameState,
      transactions,
      balance,
      round:
        gameState.activeField > 0 && gameState.activeField % 16 === 0
          ? gameState.round + 1
          : gameState.round,
      activeField: gameState.activeField + 1,
    })
  }

  const resetGame = () => setGameState(getInitialState(avatar))
  const tryAgain = () => setGameState({...getInitialState(avatar), tryAgain: true})

  useEffect(() => {
    const btn = select(buttonRef.current)
    const repeat = () =>
      btn
        .attr('opacity', 0.3)
        .attr('r', 40)
        .transition()
        .ease(easeCubicIn)
        .duration(1000)
        .attr('opacity', 0)
        .attr('r', 60)
        .on('end', repeat)
    repeat()
  }, [])

  useEffect(() => {
    const dx =
      (cornerFieldHeight / 2) *
      Math.abs(
        Math.sin(
          ((gameState.activeField - 1) * dα * 2 * Math.PI) / 180,
        ),
      )
    const dy =
      -height *
      0.1 *
      Math.abs(
        Math.sin(
          ((gameState.activeField - 1) * dα * 2 * Math.PI) / 180,
        ),
      )

    gameState.activeField &&
      select(boardRef.current)
        .transition()
        .attr(
          'transform',
          `translate(${dx}, ${dy}) rotate(${-(
            gameState.activeField - 1
          ) * dα}, ${boardSize / 2}, ${boardSize / 2})`,
        ) //.ease(easeCircle)
  }, [gameState])

  return (
    <Swipeable
      onSwipedRight={({ velocity }) =>
        started &&
        !gameOver &&
        !gamePaused &&
        advanceGame(currentField)
      }
    >
      <div ref={appRef} style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', width, minHeight: height }}>
          <div
            style={{
              position: 'relative',
              marginLeft: marginWidth,
              width: centerWidth,
            }}
          >
            <Dialog
              boardSize={boardSize}
              width={centerWidth}
              height={height}
              field={currentField}
              advanceGame={advanceGame}
              show={gamePaused}
              mobile={mobile}
            />
            <GameOver
              gameState={gameState}
              width={centerWidth}
              height={height}
              tryAgain={tryAgain}
              resetGame={resetGame}
              show={gameOver}
              boardSize={boardSize}
              avatar={avatar}
            />
            <Score
              avatar={avatar}
              gameState={gameState}
              field={currentField}
              currentFieldIdx={currentFieldIdx}
              setGameState={setGameState}
              boardSize={boardSize}
              height={height}
              width={centerWidth}
              mobile={mobile}
              started={started}
            />
          </div>
          <svg
            width={width}
            height={height}
            style={{ 
              background: theme.background,
            }}
            viewBox={`0 0 ${width} ${height}`}
            onClick={() =>
              started && !gameOver && !gamePaused && advanceGame(currentField)
            }
          >
            <g
              transform={`translate(${boardOffsetX}, ${boardOffsetY})`}
            >
              <g ref={boardRef}>
                <Board
                  avatar={avatar}
                  boardSize={boardSize}
                  fields={displayData}
                  gameState={gameState}
                />
              </g>
            </g>
            <rect width={width} height={height} fill={'#fff'} opacity={started ? 0 : 0.6} />
            <g
              style={{
                opacity: started ? 0 : 1,
                transform: `opacity 1s ease-in-out`
              }}
            >
              <circle
                ref={buttonRef}
                cx={marginWidth + centerWidth * 0.5}
                cy={height * 0.7}
                r={40}
                fill={theme.help}
              />
              <circle
                opacity={0.6}
                cx={marginWidth + centerWidth * 0.5}
                cy={height * 0.7}
                r={40}
                fill={theme.help}
                onClick={() =>
                  !gameOver &&
                  !gamePaused &&
                  advanceGame(currentField)
                }
              />
            </g>
            {/*<rect x={marginWidth} y={0} width={centerWidth} height={height} fill={'none'} stroke={'#000'} />*/}
          </svg>
        </div>
      </div>
    </Swipeable>
  )
}

App.defaultProps = {
  centerWidth: 400,
  marginWidth: 50,
  height: 700,
}

export default App
