import React, { useState } from 'react'
import theme from './theme'
import Text from './Text'
import {FIELD_SIDE_RATIO} from './constants'
import { styles } from './Field'


const Start = ({field = {}, boardSize, x, y, rotate, active, highlight, avatar }) => {

  const s = boardSize / 6 * FIELD_SIDE_RATIO
  const dy = s / 10

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={s} height={s} fill={theme.field}  />
      <g transform={`translate(${s/2},${s/2})`}>
        <Text boardSize={boardSize} type='huge' y={-2.5*dy} fill={theme.text}>Start</Text>
        <Text boardSize={boardSize} type='regular' y={dy} charsPerLine={18}>{`Sie erhalten zu Beginn des Monats ${avatar ? avatar.startingBalance : 0} Franken für den Grundbedarf`}</Text>
      </g>


      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform={`translate(${s/2-52},${s/2.4})`}>
          <g id="Group-3" transform="translate(-0.500000, 0.000000)" fill="#E02121">
              <rect id="Rectangle" x="9.5" y="4" width="87" height="5"></rect>
              <polygon id="Triangle" transform="translate(6.500000, 7.000000) rotate(-90.000000) translate(-6.500000, -7.000000) " points="6.5 1 13.5 13 -0.5 13"></polygon>
              <g id="Group" transform="translate(77.500000, 1.000000)">
                  <polygon id="Rectangle" points="2.65306122 0 26 0 23.3469388 6.22222222 -5.68434189e-14 6.22222222"></polygon>
                  <polygon id="Rectangle-Copy-3" transform="translate(13.000000, 8.888889) scale(1, -1) translate(-13.000000, -8.888889) " points="2.65306122 5.77777778 26 5.77777778 23.3469388 12 -5.68434189e-14 12"></polygon>
              </g>
          </g>
      </g>

      <rect width={s} height={s} {...(highlight ? styles.highlightOn : styles.highlightOff)} />
      <rect width={s} height={s} strokeWidth={boardSize/200} stroke={theme.border} fill='none' />
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
  active: false,
}

export default Start