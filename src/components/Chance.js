import React, { useState } from 'react'
import theme from './theme'
import Text from './Text'
import {FIELD_SIDE_RATIO} from './constants'

const Chance = ({field: { description, amount }, boardSize, x, y, rotate }) => {

  const [ revealed, setRevealed ] = useState(false)

  const s = boardSize / 6 * FIELD_SIDE_RATIO

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={s} height={s} fill={theme.field}  />
      <g transform={`translate(${s/2},${s/2}) rotate(${rotate})`}>
      {
        revealed ? (
          <Text>{description}</Text>
        ) : (
          <g>
            <Text boardSize={boardSize} type='display' y={-s/7}>?</Text>
            <Text boardSize={boardSize} type='large'  y={s/6}>Chance</Text>
          </g>
        )
      }
      </g>
      <rect width={s} height={s} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Chance.defaultProps = {
  boardSize: 800,
  field: {
    description: '',
    amount: 0,
  },
  x: 0,
  y: 0,
  rotate: 0
}

export default Chance