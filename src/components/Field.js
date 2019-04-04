import React from 'react'
import {FIELD_SIDE_RATIO} from './constants'
import theme from './theme'
import Text from './Text'

const Field = ({field: { description, price, category }, boardSize, x, y, rotate, offsetY }) => {

  const size = boardSize / 6

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}, ${size/2}, ${size/2} ) translate(0, ${offsetY})`}>
      <rect width={size} height={FIELD_SIDE_RATIO*size} fill={theme.field} />
      <rect width={size} height={0.2*size} fill={theme.categories[category]} />
      <Text boardSize={boardSize} x={size/2} y={size/2} >{description}</Text>
      <Text boardSize={boardSize} x={size/2} y={size/2+(5*size/8)} type={'bold'}>{`${Math.floor(price) === price ? price+'.–' : price  }`}</Text>
      <rect width={size} height={FIELD_SIDE_RATIO*size} strokeWidth={1} stroke={theme.border} fill='none' />
    </g>
  )

}

Field.defaultProps = {
  boardSize: 600,
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