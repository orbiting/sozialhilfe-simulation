import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts, formatAmount } from './Text'
import { Chart } from '@project-r/styleguide/chart'
import range from 'lodash/chunk'

import { scaleLinear } from 'd3-scale'
import { line, curveStepAfter } from 'd3-shape'

import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'

const LegendSymbol = ({color = '#999', size}) => <div
  style={{display: 'inline-block', width: size, height: size, background: color}}/>

  
const Score = ({gameState, setGameState, width, boardSize}) => {

  const padding = boardSize / 80
  const height = padding * 18
  const w = width - 2 * padding
  const h = height - 2 * padding

  const {
      balance,
      spent,
      mobility,
      clothing,
      leisure,
      media,
      general,
  } = gameState.score
  
  return (
    <div style={{position: 'absolute', width, background: theme.score, padding: 5, boxSizing: 'border-box',}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{...fonts(boardSize).bold, lineHeight: `${fonts(boardSize).bold.lineHeight}px`}}>Hans Mustermann</div>
        <div style={{...fonts(boardSize).regular, lineHeight: `${fonts(boardSize).bold.lineHeight}px`}}>sFr. {formatAmount(balance)}</div>
      </div>
      <div style={{...fonts(boardSize).small}}>Ausgaben</div>
      <Chart
        width={width-10}
        config={{
          "type": "Bar",
          "color": "category",
          "colorRange": [theme.categories.general, theme.categories.clothing, theme.categories.media, theme.categories.leisure, theme.categories.mobility],
          "colorLegend": true,
          "domain": [0, spent],
          "sort": "none",
          "colorSort": "none",
          'xTicks': [0, spent]
        }}
        values={[
          {category: 'Alltag', value: `${Math.abs(general)}`},
          {category: 'Kleidung', value: `${Math.abs(clothing)}`},
          {category: 'Medien', value: `${Math.abs(media)}`},
          {category: 'Freizeit', value: `${Math.abs(leisure)}`},
          {category: 'Mobilität', value: `${Math.abs(mobility)}`},
        ]}
      />
    </div>
  )
}

export default Score
