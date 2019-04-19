import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import theme from './theme'
import Text from './Text'
import {FIELD_SIDE_RATIO} from './constants'
import { css } from 'glamor'
import { styles } from './Field'

const Start = ({field: { description, amount }, boardSize, x, y, rotate, active, highlight }) => {

  const s = boardSize / 6 * FIELD_SIDE_RATIO
  const dy = s / 10

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={s} height={s} fill={theme.field}  />
      <g transform={`translate(${s/2},${s/2})`}>
        <Text boardSize={boardSize} type='huge' y={-2*dy}>Start</Text>
        <Text boardSize={boardSize} type='regular' y={dy} charsPerLine={10}>Sie erhalten zu Beginn des Monats 986 Franken für den Grundbedarf</Text>
      </g>
      <rect width={s} height={s} {...(highlight ? styles.highlightOn : styles.highlightOff)} />
      <rect width={s} height={s} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Start.defaultProps = {
  boardSize: 800,
  field: {
    description: '',
    amount: 0,
  },
  x: 0,
  y: 0,
  rotate: 0,
  active: false
}

export default Start