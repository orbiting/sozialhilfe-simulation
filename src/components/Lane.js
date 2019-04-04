import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'
import Start from './Start'
import {FIELD_SIDE_RATIO} from './constants'

import { get, reverse } from 'lodash'


const Lane = ({fields, boardSize, rotate, x, y, start}) => {

  const shortSide = boardSize / 6

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      {
        reverse(fields).map(
          (c,i) => i===fields.length-1 ? (
            start
              ? <Start boardSize={boardSize} x={3*shortSide} />
              : <Chance boardSize={boardSize} field={get(fields, i)} x={3*shortSide}/>
          ) : (
            <Field boardSize={boardSize} field={get(fields, i)} x={i*shortSide}/>
          )
        )
      }
    </g>
  )

}

Lane.defaultProps = {
  fields: [],
  boardSize: 800,
  rotate: 0,
  x: 0,
  y: 0,
  start: false
}

export default Lane