import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import theme from './theme'
import chunk from 'lodash/chunk'
import last from 'lodash/last'
import { format } from 'd3-format'

export const fonts = (boardSize) => ({
  small: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 60,
  },
  regular: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 50,
    lineHeight: `${boardSize / 50 * 1.2}px`
  },
  bold: {
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: boardSize / 50,
  },
  large: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 35,
  },
  huge: {
    fontFamily: fontFamilies.serifTitle,
    fontSize: boardSize / 20,
  },
  display: {
    fontFamily: fontFamilies.serifTitle,
    fontSize: boardSize / 10,
  }
})

const f = format(".2f");
export const formatAmount = (amount) => {
  if (Math.floor(amount) === amount) {
    return `${amount}.–`
  } else {
    return f(amount)
  }
}

const Text = ({boardSize, type, charsPerLine, children, x, y, ...rest}) => {

  if (!children)
    return null

  const tokens = children.split(/\s|-/).filter(Boolean)

  const lines = tokens.reduce((acc, cur) => {
    const lastLine = last(acc)
    if (lastLine.join(' ').length + cur.length > charsPerLine) {
      acc.push([cur])
    } else {
      last(acc).push(cur)
    }
    return acc
  }, [['']])

  const font = fonts(boardSize)[type]
  const lineHeight = font.fontSize *1.1


  return (
    <g>
      {
        lines.map((c,i) => <text x={x} y={y+(i*lineHeight)} textAnchor='middle' alignmentBaseline='central' style={font} {...rest}>{c.join(' ')}</text>)
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