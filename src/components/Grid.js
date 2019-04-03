import React, { useState } from 'react'
import Field from './Field'
import { get, chunk } from 'lodash'
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
      {/*<rect width={size} height={size} fill={'#888'} />*/}
      {
        gridCoords.right.map(
          (c,i) => i===0 ? (
            <rect width={longSide} height={longSide} {...getOffsets(c)} {...styles.field} />
          ) : (
            <rect width={longSide} height={shortSide} {...getOffsets(c)} {...styles.field} />
          )
        )
      }
      {
        gridCoords.bottom.map(
          (c,i) => i===0 ? (
            <rect width={longSide} height={longSide} {...getOffsets(c)} {...styles.field} />
          ) : (
            <Field size={shortSide} field={get(bottom, i)} {...getOffsets(c)}/>
          )
        )
      }
      {
        gridCoords.left.map(
          (c,i) => i===0 ? (
            <rect width={longSide} height={longSide} {...getOffsets(c)} {...styles.field} />
          ) : (
            <rect width={longSide} height={shortSide} {...getOffsets(c)} {...styles.field} />
          )
        )
      }
      {
        gridCoords.top.map(
          (c,i) => i===0 ? (
            <rect width={longSide} height={longSide} {...getOffsets(c)} {...styles.field} />
          ) : (
            <rect width={shortSide} height={longSide} {...getOffsets(c)} {...styles.field} />
          )
        )
      }
    </g>

	)
}

Grid.defaultProps = {
	size: 800,
	fields: []
}

export default Grid