import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import theme from './theme'

import icons, { Clothing, Leisure, Media, Mobility } from './icons'

const fields = Object.values(icons).filter(i => i.color !== theme.categories.general)

const CoverField = ({height = 200, loop = 3, config: { Icon = Media, color = theme.categories.media }}) => {
  const unit = height/15
  return (
    <g>
      <rect width={2/3*height} height={height} strokeWidth={unit/2} stroke={'#000'} fill={theme.field}>
      </rect>
      <rect width={2/3*height} height={height/3} fill={color}>
        <animate attributeName="fill-opacity" from="1" to="0.6" dur={random(1,4,true)} repeatCount={loop} />
      </rect>
      <rect width={2/3*height} height={height/3} strokeWidth={unit/2} stroke={'#000'} fill={'none'}/>
    </g>
  )
}

const CoverGroup = ({width, height, loop}) => {

  return (

    <g transform={`translate(${width/2},${height/2})`}>
      <g transform={`rotate(270)`}>
        <CoverField loop={loop} height={height/2} config={fields[random(0,fields.length-1)]} />
      </g>
      <g transform={`rotate(180)`}>
        <CoverField loop={loop} height={height/2} config={fields[random(0,fields.length-1)]}/>
      </g>
      <g transform={`rotate(90)`}>
        <CoverField loop={loop} height={height/2} config={fields[random(0,fields.length-1)]}/>
      </g>
      <g>
        <CoverField loop={loop} height={height/2} config={fields[random(0,fields.length-1)]}/>
      </g>
    </g>

  )
}


const Cover = ({size, cols, rows, loop, fill, margin}) => {

  const offset = (5/6) * size
  const width = cols * offset + 1/6 * size
  const height = rows * offset + 1/6 * size
  const w = width + 2 * margin
  const h = height + 2 * margin

  return (
    <svg width={w} height={h} style={{background: fill ? theme.background : undefined}} xmlns='http://www.w3.org/2000/svg'>
      <g transform={`translate(${margin},${margin})`}>
      {
        range(0,cols).map(i =>
          range(0,rows).map(j =>
            <g transform={`translate(${i*offset},${j*offset})`}>
              <CoverGroup width={size} height={size} loop={loop} />
            </g>
          )
        )
      }
      </g>
    </svg>
  )

}

Cover.defaultProps = {
  size:300,
  cols: 3,
  rows: 3,
  loop: 1,
  fields: fields,
  fill: false,
  margin: 3
}

export default Cover
