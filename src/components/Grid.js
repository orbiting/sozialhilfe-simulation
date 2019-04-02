import React, { useState } from 'react'
import Field from './Field'
import { get, chunk } from 'lodash'
import { css } from 'glamor'
import theme from './theme'

const margins = {
	top: 5,
	right: 5,
	bottom: 5,
	left: 5,
}

const grid = `1fr 1fr 1fr 1fr 1fr`

const gridCoords = {
	right: [
		[5,1],
		[5,2],
		[5,3],
		[5,4],
	],
	bottom: [
		[5,5],
		[4,5],
		[3,5],
		[2,5],
	],
	left: [
		[1,5],
		[1,4],
		[1,3],
		[1,2],
	],
	top: [
		[1,1],
		[2,1],
		[3,1],
		[4,1],
	],
}


const Grid = ({fields, size}) => {
	const margin = 0
	const s = size - margin

	const getGridProps = (colStart=1, rowStart=1, colEnd, rowEnd) => css({
		gridColumnStart: colStart,
		gridColumnEnd: colEnd || colStart,
		gridRowStart: rowStart,
		gridRowEnd: rowEnd || rowStart,
		msGridColumn: colStart,
		msGridRow: rowStart,
		msGridColumnSpan: `${(colEnd - colStart)}`,
		msGridRowSpan: `${(rowEnd - rowStart)}`,
	})

	const defaultSpaceStyle = css({background: theme.field})

	const [right, bottom, left, top] = chunk(fields, 4)
	const fieldData = {
		right, bottom, left, top
	}

	const renderFields = (side) => {
		return gridCoords[side].map(([col, row], i) =>
			<div {...defaultSpaceStyle} {...getGridProps(col,row)}>
				{
					i===0 ? (
						<div></div>
					) : (
						<Field field={get(fieldData[side], i, {})} orientation={`${side}`} />
					)
				}
			</div>
		)

	}

	return (
		<div style={{position: 'relative', width:s , height: s}}>
			<div {...css({
				display: ['grid', '-ms-grid'],
				width: s,
				height: s,
				MsGridColumns: grid,
				MsGridRows: grid,
				gridTemplateColumns: grid,
				gridTemplateRows: grid,
				gridGap: Math.max(size/300,2),
				background: theme.background
			})}>

				<div style={{background: '#fff'}} {...getGridProps(2,2,5,5)}>
					Lorem ipsum dolor sit amet
				</div>

				{
					renderFields('right')
				}
				{
					renderFields('bottom')
				}
				{
					renderFields('left')
				}
				{
					renderFields('top')
				}


			</div>
		</div>

	)
}

Grid.defaultProps = {
	size: 800,
	fields: []
}

export default Grid