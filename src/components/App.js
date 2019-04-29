import React, { useEffect, useRef, useState } from 'react'
import { mediaQueries } from '@project-r/styleguide'

import Board from './Board'
import { transition } from 'd3-transition'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { easeCubicOut, easeCubicIn, easeCubicInOut } from 'd3-ease'
import { Swipeable } from 'react-swipeable'

import fields from '../../fields.json'
import fields2 from '../../fields2.json'
import fields3 from '../../fields3.json'
import Score from './Score'
import theme from './theme'
import chunk from 'lodash/chunk'
import Dialog from './Dialog'
import GameOver from './GameOver'

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
    completed: [],
    accepted: [],
    rejected: [],
  },
  round: 1,
  activeField: 1,
  avatar: undefined,
}

const dα = 360 / 16

const App = ({
  centerWidth,
  marginWidth,
  height,
  mobile,
  avatar,
  started
}) => {

  const INITIAL_STATE = {
    score: {
      balance: avatar ? avatar.startingBalance : 986,
      spent: 0,
      mobility: 0,
      clothing: 0,
      leisure: 0,
      media: 0,
      general: 0,
    },
    transactions: {
      completed: [],
      accepted: [],
      rejected: [],
    },
    round: 1,
    activeField: 1,
    avatar: undefined,
  }

  const appRef = useRef(null)
  const boardRef = useRef(null)
  const buttonRef = useRef(null)

  const [gameState, setGameState] = useState(INITIAL_STATE)
  const currentFieldIdx = gameState.activeField - 1

  let fieldData

  switch (avatar ? avatar.id : undefined) {
    case 0:
      fieldData = currentFieldIdx > 1 ? fields2.data : fields.data
      break;
    case 1:
      fieldData = fields3.data
      break;
    default:
      fieldData = []
      break;
  }

  const currentField = fieldData[currentFieldIdx]

  const gameData = fieldData.slice(0, 96).map(d => {
    if (d.dependency) {
      const isRejected = gameState.transactions.rejected.some(
        e => e.id === d.dependency,
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

  const gameOver =
    currentFieldIdx === 95 || gameState.score.balance < 0
  const gamePaused =
    currentFieldIdx > 0 && currentField.type === 'chance'

  const advanceGame = (field, reject = false) => {
    //appRef.current && appRef.current.scrollIntoView()

    const completed = [ ...gameState.transactions.completed, { field, reject } ]

    const accepted =
      (field && !reject)
        ? gameState.transactions.accepted.concat(field)
        : gameState.transactions.accepted
    const rejected =
      (field && reject)
        ? gameState.transactions.rejected.concat(field)
        : gameState.transactions.rejected

    const sumTransactions = category => 
      accepted
        .filter(t => t.category === category || t.type === category)
        .reduce((acc, cur) => acc + cur.amount, 0)

    const general = accepted
      .concat(rejected)
      .reduce((acc, cur) => acc + cur.pauschal, 0)
    const start = sumTransactions('start')
    const mobility = sumTransactions('mobility')
    const clothing = sumTransactions('clothing')
    const leisure = sumTransactions('leisure')
    const media = sumTransactions('media')
    const balance =
      start + general + mobility + clothing + leisure + media
    const spent = Math.abs(Math.min(balance - start, 0))

    setGameState({
      ...gameState,
      transactions: {
        completed,
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
        media,
      },
      round:
        gameState.activeField > 0 && gameState.activeField % 16 === 0
          ? gameState.round + 1
          : gameState.round,
      activeField: gameState.activeField + 1,
    })
  }

  useEffect(() => setGameState(INITIAL_STATE), [avatar])

  const resetGame = () => setGameState(INITIAL_STATE)

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
                opacity: currentFieldIdx > 0 ? 0 : 1,
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
                  setTimeout(() => {
                    advanceGame(currentField)
                  }, 400)
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
