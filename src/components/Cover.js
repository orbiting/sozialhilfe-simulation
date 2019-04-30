import React from 'react'
import range from 'lodash/range'
import random from 'lodash/random'
import theme from './theme'

import icons, { Clothing, Leisure, Media, Mobility } from './icons'

const fields = Object.values(icons).filter(i => i.color !== theme.categories.general)

console.log("Cover.js:10", fields)

const CoverField = ({height = 200, loop = 3, config: { Icon = Media, color = theme.categories.media }}) => {
  const unit = height/15
  return (
    <g transform={`translate(${0},${0}) rotate(0, ${2/3*height/2}, ${height/2})`}>
      <rect width={2/3*height} height={height} strokeWidth={unit/2} stroke={'#000'} fill={theme.field}>
      </rect>
      <rect width={2/3*height} height={height/3} fill={color}>
        <animate attributeName="fill-opacity" from="1" to="0.6" dur={random(1,4,true)} repeatCount={loop} />
      </rect>
      <rect width={2/3*height} height={height/3} strokeWidth={unit/2} stroke={'#000'} fill={'none'}/>
      <g transform={`translate(${2/3*height/2-2.5*unit},${height/2})`}>
        {/*<Icon width={5*unit} height={5*unit} fill={theme.background}/>*/}
      </g>
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


const Cover = ({width, cols, rows, loop}) => {

  const size = (width/cols)*(6/5)
  const offset = (5/6)*size
  const height = 5/6 * rows * size
  const margin = width/50


  return (
    <svg width={width} height={height} xmlns='http://www.w3.org/2000/svg'>
      <g transform={`scale(0.9) translate(${margin},${margin})`}>
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
  width:1200,
  cols: 10,
  rows: 4,
  loop: 5,
  fields: fields.data
}

export default Cover
