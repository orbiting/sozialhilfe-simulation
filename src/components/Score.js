import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts } from './Text'
import { Chart } from '@project-r/styleguide/lib/chart'
import CsvChart from '@project-r/styleguide/lib/components/Chart/Csv'
import { range, random } from 'lodash'

import { scaleLinear } from 'd3-scale'
import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'

const LegendSymbol = ({color = '#999', size}) => <div
  style={{display: 'inline-block', width: size, height: size, background: color}}/>

const Score = ({gameState, setGameState, width, boardSize}) => {

  const padding = boardSize / 80
  const height = padding * 18
  const w = width - 2 * padding
  const h = height - 2 * padding

  const {balance, budget: {leisure, mobility, media}} = gameState.score

  const leftWidth = mobility * w
  const rightWidth = media * w
  const centerWidth = w - leftWidth - rightWidth

  const [leftDraggable, setLeftDraggable] = useState(null)
  const [rightDraggable, setRightDraggable] = useState(null)

  const updateGameState = position => (arg) => {
    if (leftDraggable || rightDraggable) {
      let nextScore = {...gameState.score}
      if (position === 'left') {
        const delta = ((arg.clientX === 0 ? 0.001 : arg.clientX) - leftDraggable) * mobility
        console.log('Score.js:26 [delta]', delta)
        nextScore.budget = {
          ...nextScore.budget,
          mobility: (leftWidth + delta) / w,
        }
      } else {

      }
      setGameState({...gameState, score: nextScore})
    }
  }

  const bars = [
    {label: 'Jan', start: 986, values: {general: 500, mobility: 100, media: 100, leisure: 100}},
    {label: 'Feb', start: 1023, values: {general: 281, mobility: 123, media: 123, leisure: 242}},
    {label: 'Mär', start: 867, values: {general: 281, mobility: 123, media: 123, leisure: 242}},
    {label: 'Apr', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Mai', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Jun', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Jul', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Aug', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Sep', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Okt', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Nov', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
    {label: 'Dez', start: 0, values: {general: 0, mobility: 0, media: 0, leisure: 0}},
  ]

  const barHeight = 100
  const spacing = width / 100
  const barWidth = (width - ((bars.length - 1) * spacing)) / bars.length

  const scale = scaleLinear().domain([0, 986]).range([0, barHeight])

  const LegendIcon = ({color, children}) => <div><div style={{display: 'inline-block', background: color, width: width/25, height: 8, verticalAlign: 'middle'}}>&nbsp;</div> {children}</div>

  return (
    <div style={{position: 'absolute', width, background: theme.score}}>
      <div>Kontostand: {balance}</div>
      <div>Ausgaben:</div>
      <svg width={width} height={barHeight + 20}>
        <g>
          {
            bars.map((value, i) => {
                const outlineHeight = value.start ? scale(value.start) : barHeight
                const scaledVals = Object.values(value.values).map(v => scale(v))
                return (
                  <g transform={`translate(${i * (spacing + barWidth)})`}>
                    <rect height={outlineHeight} width={barWidth} y={barHeight - outlineHeight} fill={value.start ? '#ddd' : '#fff'}/>
                    {
                      Object.keys(value.values).map((k, i) => <rect height={scaledVals[i]} width={barWidth} y={barHeight - scaledVals[i] - scaledVals.slice(0, i).reduce((acc, cur) => acc + cur, 0)} fill={theme.categories[k]}/>)
                    }
                    <text x={barWidth / 2} textAnchor={'middle'} y={115}>{value.label}</text>
                  </g>
                )
              }
            )
          }
        </g>
      </svg>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <LegendIcon color={theme.categories.general}>Alltag</LegendIcon><LegendIcon color={theme.categories.mobility}>Mobilität</LegendIcon> <LegendIcon color={theme.categories.leisure}>Freizeit</LegendIcon> <LegendIcon color={theme.categories.media}>Medien</LegendIcon>
      </div>
    </div>
  )
}

export default Score
