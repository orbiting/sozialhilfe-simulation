import React , { useState } from 'react'
import theme from './theme'
import Text, { fonts } from './Text'
import { Chart } from '@project-r/styleguide/lib/chart'
import CsvChart  from '@project-r/styleguide/lib/components/Chart/Csv'
import { range } from 'lodash'

import { scaleOrdinal } from 'd3-scale'
import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'

const LegendSymbol = ({color='#999', size}) => <div style={{display: 'inline-block', width: size, height: size, background: color}} />

const Score = ({gameState, setGameState, width, boardSize}) => {

  const padding = boardSize / 80
  const height = padding * 18
  const w = width - 2 * padding
  const h = height - 2 * padding

  const { balance, budget: { leisure, mobility, media } } = gameState.score

  const leftWidth = mobility * w
  const rightWidth = media * w
  const centerWidth = w - leftWidth - rightWidth

  const [ leftDraggable, setLeftDraggable ] = useState(null)
  const [ rightDraggable, setRightDraggable ] = useState(null)

  const updateGameState = position => (arg) => {
    if (leftDraggable || rightDraggable) {
      let nextScore = {...gameState.score}
      if (position === 'left') {
        const delta = ((arg.clientX === 0 ? 0.001 : arg.clientX)-leftDraggable)* mobility
        console.log('Score.js:26 [delta]', delta)
        nextScore.budget = {
          ...nextScore.budget,
          mobility: (leftWidth + delta) / w,
        }
      } else {

      }
      setGameState({ ...gameState, score: nextScore })
    }
  }

  const factor = 5
  const units = 986 / factor
  const unitSize = 6
  const spacing = 2
  const totalWidth = units * (unitSize + spacing)
  const totalHeight = Math.ceil((units*(unitSize+spacing))/width)*(unitSize+spacing)

  return (
    <div style={{position: 'absolute', width, background: theme.score}}>
      <div>Kontostand: {balance}</div>
      <div>Ausgaben im Mai:</div>
      <svg width={totalWidth} height={totalHeight}>
        <g>
        {
          range(0, units).map(i =>
            <rect height={unitSize} width={unitSize} x={i*(unitSize+spacing) % width} y={Math.floor((i*(unitSize+spacing))/width)*(unitSize+spacing)} fill={'#ddd'} />
          )
        }
        </g>
      </svg>
      <div>{factor} Franken ausgegeben für<br/><LegendSymbol size={2*unitSize} label='Nahrung' color={theme.categories.mobility} /> Mobilität</div>
    </div>
  )
}

export default Score
