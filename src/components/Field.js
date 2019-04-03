import React from 'react'
import { fontFamilies } from '@project-r/styleguide'
import constants from './constants'
import theme from './theme'
import { chunk } from 'lodash'

const Field = ({field: { description, price }, size, x, y, rotate, offsetY }) => {

  const tokens = description.split(/\s/).filter(Boolean)
  const tokenChunks = chunk(tokens, 2).reduce((acc,cur) => {
    const rest = []
    cur.forEach(e => {
      if (e.length > 10) {
        acc.push([e])
      } else {
        rest.push(e)
      }
    })
    if (rest.length > 0) {
      acc.push(rest)
    }
    return acc
  }, [])

  const width = size
  const height = constants.FIELD_SIDE_RATIO*width

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}, ${size/2}, ${size/2} ) translate(0, ${offsetY})`}>
      <rect width={size} height={constants.FIELD_SIDE_RATIO*size} fill={theme.field} />
      <rect width={size} height={0.2*size} fill={theme.categories['entertainment']} />
      {
        tokenChunks.map((c,i) =>
          <text x={size/2} y={size/2+(i*size/8)} textAnchor='middle' style={{fontFamily: fontFamilies.sansSerifRegular, fontSize: size/8}}>{c.join(' ')}</text>
        )
      }
      <text x={size/2} y={size/2+(4*size/8)} textAnchor='middle' style={{fontFamily: fontFamilies.sansSerifMedium, fontSize: size/5}}>{price}.–</text>
      <rect width={size} height={constants.FIELD_SIDE_RATIO*size} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Field.defaultProps = {
  size: 100,
  field: {
    description: '',
    price: 0,
  },
  x: 0,
  y: 0,
  rotate: 0,
  offsetY: 0
}

export default Field