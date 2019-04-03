import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'

import { get, chunk, range } from 'lodash'
import { css } from 'glamor'
import theme from './theme'
import constants from './constants'

const margins = {
	top: 5,
	right: 5,
	bottom: 5,
	left: 5,
}

const gridCoords = {
	right: [
		[4,0],
		[4,1],
		[4,2],
		[4,3],
	],
	bottom: [
    [4,4],
    [3,4],
		[2,4],
    [1,4],
	],
	left: [
		[0,4],
		[0,3],
		[0,2],
		[0,1],
	],
	top: [
		[0,0],
		[1,0],
		[2,0],
		[3,0],
	],
}

const styles = {
  grid: css({
    background: theme.background
  }),
  field: css({
    fill: theme.field,
    stroke: theme.border,
    strokeWidth: 1,
  })
}

const Grid = ({fields, size, segments}) => {

	const [right, bottom, left, top] = chunk(fields, 4)

  const shortSide = size / (3 + 2 * constants.FIELD_SIDE_RATIO)
  const longSide = constants.FIELD_SIDE_RATIO * shortSide

  const getOffsets = ([x, y]) => ({
    x: (x > 0 ? 1 : 0)*longSide+Math.max(0, x-1)*shortSide,
    y: (y > 0 ? 1 : 0)*longSide+Math.max(0, y-1)*shortSide
  })

	return (

    <g>
			{
				gridCoords.right.map(
					(c,i) => i===0 ? (
						<Chance size={shortSide} field={get(right, i)} {...getOffsets(c)} rotate='-90'/>
					) : (
						<Field size={shortSide} field={get(right, i)} {...getOffsets(c)}  rotate='-90'/>
					)
				)
			}
      {
        gridCoords.bottom.map(
          (c,i) => i===0 ? (
						<Chance size={shortSide} field={get(bottom, i)} {...getOffsets(c)}/>
          ) : (
            <Field size={shortSide} field={get(bottom, i)} {...getOffsets(c)}/>
          )
        )
      }
      {
        gridCoords.left.map(
					(c,i) => i===0 ? (
						<Chance size={shortSide} field={get(left, i)} {...getOffsets(c)} rotate='90'/>
					) : (
						<Field size={shortSide} field={get(left, i)} {...getOffsets(c)}  rotate='90' offsetY={-shortSide/2} />
					)
        )
      }
			{
				gridCoords.top.map(
					(c,i) => i===0 ? (
						<Chance size={shortSide} field={get(top, i)} {...getOffsets(c)} rotate='180'/>
					) : (
						<Field size={shortSide} field={get(top, i)} {...getOffsets(c)}  rotate='180'  offsetY={-shortSide/2} />
					)
				)
			}
    </g>

	)
}

Grid.defaultProps = {
	size: 500,
	fields: []
}

export default Grid