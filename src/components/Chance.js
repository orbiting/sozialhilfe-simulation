import React, { useState } from 'react'
import { fontFamilies } from '@project-r/styleguide'
import constants from './constants'
import theme from './theme'
import { chunk } from 'lodash'

const Chance = ({field: { description, price }, size, x, y, rotate }) => {

  const [ revealed, setRevealed ] = useState(false)

  const tokens = description.split(/\s/).filter(Boolean)
  const tokenChunks = chunk(tokens, 1)

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={constants.FIELD_SIDE_RATIO*size} height={constants.FIELD_SIDE_RATIO*size} fill={theme.field}  />
      <g transform={`translate(${constants.FIELD_SIDE_RATIO*size/2},${constants.FIELD_SIDE_RATIO*size/2}) rotate(${rotate})`}>
      {
        revealed ? (
          tokenChunks.map((c,i) =>
            <text y={i*size/8} textAnchor='middle' style={{fontFamily: fontFamilies.sansSerifRegular, fontSize: size/8}}>{c.join(' ')}</text>
          )
        ) : (
          <g>
            <text onClick={() => setRevealed(true)} y={-size/6} textAnchor='middle' alignmentBaseline='central' style={{fontFamily: fontFamilies.serifTitle, fontSize: size/1.5}}>?</text>
            <text onClick={() => setRevealed(true)} y={size/4} textAnchor='middle' alignmentBaseline='central' style={{fontFamily: fontFamilies.sansSerifRegular, fontSize: size/8}}>CHANCE</text>
          </g>
        )
      }
      </g>
      <rect width={constants.FIELD_SIDE_RATIO*size} height={constants.FIELD_SIDE_RATIO*size} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Chance.defaultProps = {
  size: 100,
  field: {
    description: '',
    price: 0,
  },
  x: 0,
  y: 0,
  rotate: 0
}

export default Chance