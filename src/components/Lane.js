import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'
import Start from './Start'
import get from 'lodash/get'

const Lane = ({fields, gameState, boardSize, rotate, x, y, start}) => {

  const shortSide = boardSize / 6
  const activeField = gameState.activeField

  const w = 3*shortSide

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      {
        fields.map((c,i) => {
          const field = get(fields, i)
          if(i===0) {
            return start
              ? <Start boardSize={boardSize} x={w} />
              : <Chance boardSize={boardSize} field={field} x={w}/>
          } else {
            return <Field boardSize={boardSize} field={field} x={w-i*shortSide} active={field.id <= activeField}/>
          }
        })
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