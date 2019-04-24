import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts, formatAmount } from './Text'
import { Chart } from '@project-r/styleguide/chart'
import range from 'lodash/range'

import { scaleLinear } from 'd3-scale'
import { stack, line, curveStepAfter } from 'd3-shape'
import { sum } from 'd3-array'

import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'
import { Avatar, Wallet, Calendar } from './icons';

const MONTHS = ['Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober']

const LegendSymbol = ({color = '#999', size}) => <div
  style={{display: 'inline-block', width: size, height: size, background: color, border: '1px solid #fff'}}/>

const Score = ({gameState, setGameState, field, width, boardSize, startingBalance = 986}) => {

  const {
    balance,
    spent,
    mobility,
    clothing,
    leisure,
    media,
    general
  } = gameState.score

  const padding = boardSize / 120
  const height = padding * 18
  const w = width - 2 * padding
  const h = height - 2 * padding
  const iconSize = boardSize/45
  const iconColor = theme.background

  const chartWidth = w
  const chartPadding = 2
  const chartHeight = boardSize/50

  const xValues = ['general', 'leisure', 'clothing', 'mobility', 'media']
  const xScale = scaleLinear().domain([0, sum(xValues, cat => gameState.score[cat])]).range([0, chartWidth-2*chartPadding])
  const stackedValues = xValues.reduce((acc,cur,i,arr) => {
    const val = gameState.score[cur]
    const prev = acc[i-1] || {x:0}
    const nextDatum = { x0: prev.x, x: val+prev.x, cat: cur }
    acc.push(nextDatum)
    return acc
    },
    []
  )
    
  
  return (
    <div style={{position: 'absolute', width, background: theme.score, padding, boxSizing: 'border-box',}}>
      <div style={{width: w*1}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'block', width: '45%', alignItems: 'center'}}>
          <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Name</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>Hans Muster</div>
          </div>
          <div style={{display: 'block', width: '30%', alignItems: 'center'}}>
            <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Datum</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>{(field.id * 2 - 1) % 32}. {MONTHS[gameState.round-1]}</div>
          </div>
          <div style={{display: 'block', width: '25%', alignItems: 'center'}}>
          <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Kontostand</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>{formatAmount(balance)}</div>
          </div>
        </div>
        <div>
          {
            spent > 0 &&
            <div>
              <div style={{...fonts(boardSize).tiny, color: '#fff', borderTop: '0px solid #fff', marginTop: padding/2, paddingTop: padding, paddingBottom: padding/2}}>Ausgaben {gameState.round > 1 ? `in den vergangenen ${gameState.round} Monaten` : `im laufenden Monat`}: {formatAmount(spent)}</div>
              <svg width={chartWidth} height={chartHeight}>
                <g transform={'translate(1,1)'}>
                {
                  stackedValues.map(({x0, x, cat}) => <rect x={xScale(x0)} width={xScale(x)-xScale(x0)} stroke={'#fff'} height={chartHeight-2*chartPadding} fill={theme.categories[cat]} />)
                }
                </g>
              </svg>
              <div style={{...fonts(boardSize).tiny, color: '#fff'}}>
                  <LegendSymbol size={9} /> Alltag <LegendSymbol size={9} color={theme.categories.leisure} /> Freizeit <LegendSymbol size={9} color={theme.categories.clothing} /> Kleidung <LegendSymbol size={9} color={theme.categories.mobility} /> Mobilität <LegendSymbol size={9} color={theme.categories.media} /> Medien 
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  )
}

export default Score
