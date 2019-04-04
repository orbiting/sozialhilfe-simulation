import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import theme from './theme'
import { chunk } from 'lodash'
import Text from './Text'
import {FIELD_SIDE_RATIO} from './constants'

const Start = ({field: { description, price }, boardSize, x, y, rotate }) => {

  const s = boardSize / 6 * FIELD_SIDE_RATIO
  const dy = s / 10

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={s} height={s} fill={theme.field}  />
      <g transform={`translate(${s/2},${s/2})`}>
        <Text boardSize={boardSize} type='huge' y={-2*dy}>Start</Text>
        <Text boardSize={boardSize} type='regular' y={dy} wordsPerLine={3}>Sie erhalten zu Beginn des Monats 986 Franken für den Grundbedarf</Text>
      </g>
      <rect width={s} height={s} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Start.defaultProps = {
  boardSize: 800,
  field: {
    description: '',
    price: 0,
  },
  x: 0,
  y: 0,
  rotate: 0
}

export default Start