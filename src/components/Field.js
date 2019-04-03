import React from 'react'
import { fontFamilies } from '@project-r/styleguide'
import constants from './constants'
import theme from './theme'
import { chunk } from 'lodash'

import { css } from 'glamor'

const styles = {
  wrapper: css({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#eee',
    display: 'flex'
  }),
  header: css({
    background: '#999',
    flex: '1'
  }),
  bottom: css({
    flexDirection: 'column',
  }),
  left: css({
    flexDirection: 'row-reverse',
  }),
  top: css({
    flexDirection: 'column-reverse',
  }),
  right: css({
    flexDirection: 'row',
  }),
  body: css({
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 20,
  })
}

const Field = ({field: { description, price }, size, x, y, orientation }) => {

  const tokens = description.split(/\s/).filter(Boolean)
  const tokenChunks = chunk(tokens, 2)

  return (
    <g transform={`translate(${x}, ${y})`}>
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
  orientation: 'top'
}

export default Field