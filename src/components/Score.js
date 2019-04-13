import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts } from './Text'
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

  const transactions = range(0,4).flatMap(
    i => range(0,16).map(j => ({ month: i, day: j, amount: j % 16 === 0 ? 986 : -67 }))
  )

  const chartHeight = 50
  const stepWidth = width / transactions.length

  const summedTransactions = transactions.reduce((acc,cur) => {
    acc.push({...cur, value: acc[acc.length - 1] ? cur.amount + acc[acc.length - 1].value : cur.amount})
    return acc
  }, [])
  const scale = scaleLinear().domain([0, Math.max(...summedTransactions.map(t => t.value))]).rangeRound([0, chartHeight])

  const l = line().x((d,i) => i*stepWidth).y((d,i) => chartHeight-scale(d.value)).curve(curveStepAfter)

  return (
    <div style={{position: 'absolute', width, background: theme.score, padding: 5}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{...fonts(boardSize).bold, lineHeight: `${fonts(boardSize).bold.lineHeight}px`}}>Hans Mustermann</div>
        <div style={{...fonts(boardSize).regular, lineHeight: `${fonts(boardSize).bold.lineHeight}px`}}>sFr. {balance}.00</div>
      </div>
      <div style={{...fonts(boardSize).small}}>Saldovelauf</div>
      <svg width={width} height={chartHeight}>
        <g>
          {
            <path d={l(summedTransactions)} fill={'none'} stroke={'#999'} strokeWidth={2} />
            //summedTransactions.map((t, i) => console.log('Score.js:80 [t.value]', scale(t.value)) || <circle r={1} cx={i*stepWidth} cy={scale(t.value)} />)
            // bars.map((value, i) => {
            //     const outlineHeight = value.start ? scale(value.start) : barHeight
            //     const scaledVals = Object.values(value.values).map(v => scale(v))
            //     return (
            //       <g transform={`translate(${i * (spacing + barWidth)})`}>
            //         <rect height={outlineHeight} width={barWidth} y={barHeight - outlineHeight} fill={value.start ? '#ddd' : '#f9f9f9'}/>
            //         {
            //           Object.keys(value.values).map((k, i) => <rect height={scaledVals[i]} width={barWidth} y={barHeight - scaledVals[i] - scaledVals.slice(0, i).reduce((acc, cur) => acc + cur, 0)} fill={theme.categories[k]}/>)
            //         }
            //         {/*<text x={barWidth / 2} textAnchor={'middle'} y={12}>{Object.values(value.values).reduce((acc,cur) => acc + cur, 0) || ''}</text>*/}
            //         <text x={barWidth / 2} textAnchor={'middle'} y={barHeight+15} style={{...fonts(boardSize).small}}>{value.label}</text>
            //       </g>
            //     )
            //   }
            // )
          }
        </g>
      </svg>
      <div style={{...fonts(boardSize).small}}>Ausgaben im Mai</div>
      <Chart
        width={width-10}
        config={{
          "type": "Bar",
          "color": "category",
          "colorRange": [theme.categories.media, theme.categories.leisure, theme.categories.mobility, theme.categories.general],
          "colorLegend": true,
          "domain": [0, 986],
          "sort": "none",
          "colorSort": "none",
          'xTicks': [0, 986]
        }}
        values={[
          {category: 'Medien', value: '234'},
          {category: 'Freizeit', value: '123'},
          {category: 'Mobilität', value: '345'},
          {category: 'Allgemein', value: '123'},
        ]}
      />
    </div>
  )
}

export default Score
