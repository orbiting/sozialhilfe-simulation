import React, { useState } from 'react'
import theme from './theme'
import Text from './Text'
import { FIELD_SIDE_RATIO } from './constants'
import { styles } from './Field'

const Start = ({
  field = {},
  boardSize,
  x,
  y,
  rotate,
  active,
  highlight,
  avatar,
}) => {
  const s = (boardSize / 6) * FIELD_SIDE_RATIO
  const dy = s / 10

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={s} height={s} fill={theme.field} />
      <g transform={`translate(${s / 2},${s / 2})`}>
        <Text
          boardSize={boardSize}
          type="huge"
          y={-2.5 * dy}
          fill={theme.text}
        >
          Start
        </Text>
        <Text
          boardSize={boardSize}
          type="regular"
          y={dy}
          charsPerLine={18}
        >{`Sie erhalten zu Beginn des Monats ${
          avatar ? avatar.startingBalance : 0
        } Franken für den Grundbedarf`}</Text>
      </g>

      <svg
        width="103px"
        height="14px"
        viewBox="0 0 103 14"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Group-3"
            transform="translate(-0.500000, 0.000000)"
            fill="#E02121"
          >
            <rect
              id="Rectangle"
              x="9.5"
              y="4"
              width="87"
              height="5"
            />
            <polygon
              id="Triangle"
              transform="translate(6.500000, 7.000000) rotate(-90.000000) translate(-6.500000, -7.000000) "
              points="6.5 1 13.5 13 -0.5 13"
            />
            <g id="Group" transform="translate(77.500000, 0.000000)">
              <polygon
                id="Rectangle"
                points="2.65306122 0 26 0 23.3469388 7 0 7"
              />
              <polygon
                id="Rectangle-Copy-3"
                transform="translate(13.000000, 9.500000) scale(1, -1) translate(-13.000000, -9.500000) "
                points="2.65306122 6 26 6 23.3469388 13 0 13"
              />
            </g>
          </g>
        </g>
      </svg>

      <rect
        width={s}
        height={s}
        {...(highlight ? styles.highlightOn : styles.highlightOff)}
      />
      <rect
        width={s}
        height={s}
        strokeWidth={boardSize / 200}
        stroke={theme.border}
        fill="none"
      />
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
