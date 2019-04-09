import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import theme from './theme'
import { last } from 'lodash'

export const fonts = (boardSize) => ({
  regular: {
    fontFamily: fontFamilies.sansSerifRegular,
    fontSize: boardSize / 50,
    lineHeight: boardSize / 50 + 2
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

const Text = ({boardSize, type, children, wordsPerLine, active, x, y, ...rest}) => {

  const tokens = children.split(/\s/).filter(Boolean)
  const tokenChunks = tokens.reduce((acc, cur) => {
    if (acc[acc.length-1] && (acc[acc.length-1].reduce((a,c) => c.length + a, 0)+cur.length < 17 && acc[acc.length-1].length < 3)) {
      acc[acc.length-1].push(cur)
    } else {
      acc.push([cur])
    }
    return acc
  }, [])

  const font = fonts(boardSize)

  return (
    <g>
      {
        tokenChunks.map((c,i) =>
          active
            ? <text x={x} y={y+(i*font[type].lineHeight)} textAnchor='middle' alignmentBaseline='central' style={font[type]} {...rest}>{c.join(' ')}</text>
            : <rect x={-50} y={y+(i*font[type].lineHeight)} width={100} height={font[type].lineHeight * 0.5} fill={'#999'}/>
        )
      }
    </g>
  )
}

Text.defaultProps = {
  boardSize: 800,
  type: 'regular',
  x: 0,
  y: 0,
  wordsPerLine: 2,
  active: true,
}

export default Text