import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts, formatAmount } from './Text'
import { Chart } from '@project-r/styleguide/chart'
import range from 'lodash/range'
import reverse from 'lodash/reverse'
import sortBy from 'lodash/sortBy'

import { scaleLinear } from 'd3-scale'
import { stack, line, curveStepAfter } from 'd3-shape'
import { sum } from 'd3-array'

import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'
import icons, { Avatar, Wallet, Calendar } from './icons';
import AVATARS from './avatars';

const MONTHS = ['Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt']

const LegendSymbol = ({color = '#999', size}) => <div
  style={{display: 'inline-block', width: size, height: size, background: color, border: '1px solid #fff'}}/>

const Score = ({gameState, setGameState, field = {}, width, height, boardSize, showInfo, currentFieldIdx}) => {

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
  
  const transactionLog = gameState.transactions.completed.map(t => {
    const icon = icons[t.field.category] || icons.general
    const generalIcon = icons.general
    return (
      <>
        { !t.reject &&
          <div key={`p${t.field.id}`} style={{...fonts(boardSize).tiny, display: 'inline-block', width: width/7, padding: 5, background: theme.categories[t.field.category] || '#000', color: '#fff'}}><icon.Icon fill={'#fff'} width={20} height={20} /><br/>{formatAmount(t.field.amount)}</div>
        }
        <div key={`a${t.field.id}`} style={{...fonts(boardSize).tiny, display: 'inline-block', width: width/7, padding: 5, background: theme.categories['general'], color: '#fff'}}><generalIcon.Icon fill={'#fff'} width={20} height={20} /><br/>{formatAmount(t.field.pauschal)}</div>
      </>
    )
  })

  const logInfo = 
    <>
      <div style={{...fonts(boardSize).tiny, boxSizing: 'border-box', padding: 5, width: width/5, background: theme.categories['general'], color: '#fff'}}><icons.general.Icon fill={'#fff'} width={20} height={20} /><br/>Leben</div>
      <div style={{...fonts(boardSize).tiny, boxSizing: 'border-box', padding: 5, width: width/5, background: theme.categories['leisure'], color: '#fff'}}><icons.leisure.Icon fill={'#fff'} width={20} height={20} /><br/>Freizeit</div>
      <div style={{...fonts(boardSize).tiny, boxSizing: 'border-box', padding: 5, width: width/5, background: theme.categories['clothing'], color: '#fff'}}><icons.clothing.Icon fill={'#fff'} width={20} height={20} /><br/>Kleider</div>
      <div style={{...fonts(boardSize).tiny, boxSizing: 'border-box', padding: 5, width: width/5, background: theme.categories['mobility'], color: '#fff'}}><icons.mobility.Icon fill={'#fff'} width={20} height={20} /><br/>Mobilität</div>
      <div style={{...fonts(boardSize).tiny, boxSizing: 'border-box', padding: 5, width: width/5, background: theme.categories['media'], color: '#fff'}}><icons.media.Icon fill={'#fff'} width={20} height={20} /><br/>Medien</div>
    </>

  return (
    <div style={{position: 'absolute', width, height, boxSizing: 'border-box', pointerEvents: 'none'}}>
      <div style={{width: w*1, background: theme.score, padding}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'block', width: '33.3%', alignItems: 'center'}}>
            <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Runde</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>{gameState.round}/6</div>
          </div>
          <div style={{display: 'block', width: '33.3%', alignItems: 'center', position: 'relative'}}>
            <div style={{...fonts(boardSize).tiny, position: 'absolute', padding: '4%',background: 'red', color: '#fff', top: '130%', width: '100%', left: '-50%', opacity: showInfo ? 1 : 0, transform: 'opacity 0.3s ease-in-out'}}>So viel Monat ist übrig.</div>
            <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Datum</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>{(field.id * 2 - 1) % 32}. {MONTHS[gameState.round-1]}</div>
          </div>
          <div style={{display: 'block', width: '33.3%', alignItems: 'center', position: 'relative'}}>
          <div style={{...fonts(boardSize).tiny, position: 'absolute', padding: '4%',background: 'red', color: '#fff', top: '130%', width: '100%', left: '-5%', opacity: showInfo ? 1 : 0, transform: 'opacity 0.3s ease-in-out'}}>So viel Geld ist übrig.</div>
            <div style={{...fonts(boardSize).tiny, color: '#fff'}}>Kontostand</div>
            <div style={{...fonts(boardSize).large, color: '#fff'}}>{formatAmount(balance)}</div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', 'bottom': 0, width, overflowX: 'hidden', paddingBottom: 0}}>
        {showInfo && <div style={{...fonts(boardSize).tiny, padding: 10, background: 'red', color: '#fff', marginBottom: '1%'}}>Dafür geben Sie Ihr Geld aus</div> } 
        <div style={{display: 'flex', whiteSpace: 'nowrap', width: 96*width/7}}>
          {
            transactionLog.length > 0 
              ? reverse(transactionLog)
              : logInfo
          }
        </div>
      </div>
    </div>
  )
}

Score.defaultProps = {
  avatar: AVATARS[0]
}

export default Score
