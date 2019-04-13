import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import theme from './theme'
import chunk from 'lodash/chunk'
import last from 'lodash/last'

export const fonts = (boardSize) => ({
  small: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 60,
  },
  regular: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 50,
    lineHeight: `${boardSize / 50 + 2}`
  },
  bold: {
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: boardSize / 40,
    lineHeight: boardSize / 25 + 3
  },
  large: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 35,
    lineHeight: boardSize / 35 + 3
  },
  huge: {
    fontFamily: fontFamilies.serifTitle,
    fontSize: boardSize / 20,
    lineHeight: boardSize / 20
  },
  display: {
    fontFamily: fontFamilies.serifTitle,
    fontSize: boardSize / 10,
    lineHeight: boardSize / 10
  }
})

const Text = ({boardSize, type, children, charsPerLine, x, y, ...rest}) => {

  const tokens = children.split(/\s/).filter(Boolean)

  const lines = tokens.reduce((acc, cur) => {
    const lastLine = last(acc)
    if (lastLine.join(' ').length > charsPerLine) {
      acc.push([cur])
    } else {
      last(acc).push(cur)
    }
    return acc
  }, [['']])

  const font = fonts(boardSize)

  return (
    <g>
      {
        lines.map((c,i) => <text x={x} y={y+(i*font[type].lineHeight)} textAnchor='middle' alignmentBaseline='central' style={font[type]} {...rest}>{c.join(' ')}</text>)
      }
    </g>
  )
}

Text.defaultProps = {
  boardSize: 800,
  type: 'regular',
  x: 0,
  y: 0,
  charsPerLine: 6,
}

export default Text