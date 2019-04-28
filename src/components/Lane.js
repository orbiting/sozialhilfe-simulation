import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'
import Start from './Start'
import get from 'lodash/get'
import reverse from 'lodash/reverse'
import { GAME_INITIAL_STATE } from './App';

const Lane = ({fields, gameState, boardSize, rotate, x, y, start, avatar, blink}) => {

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
              ? <Start avatar={avatar} highlight={field.id === activeField} boardSize={boardSize} x={w} />
              : <Chance highlight={field.id === activeField} boardSize={boardSize} field={field} x={w} />
          } else {
            return <Field blink={blink} boardSize={boardSize} field={field} x={w-i*shortSide} highlight={field.id === activeField} active={field.id-5 <= activeField && field.id <= activeField}/>
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
  start: false,
  gameState: GAME_INITIAL_STATE
}

export default Lane