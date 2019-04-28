import React, { useState } from 'react'
import theme from './theme'
import Text from './Text'
import {FIELD_SIDE_RATIO} from './constants'
import { styles } from './Field'

const Chance = ({field: { description, amount }, boardSize, x, y, rotate, highlight = false }) => {

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
            <Text boardSize={boardSize} type='display' y={-s/7} fill={theme.chance}>?</Text>
            <Text boardSize={boardSize} type='large'  y={s/6}>Chance</Text>
          </g>
        )
      }
      </g>
      <rect width={s} height={s} {...(highlight ? styles.highlightOn : styles.highlightOff)} />
      <rect width={s} height={s} strokeWidth={boardSize/200} stroke={theme.border} fill='none' />
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
  rotate: 0,
}

export default Chance