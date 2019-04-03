import React, { useState } from 'react'
import Grid from './Grid'


const margins = {
	top: 100,
	right: 100,
	bottom: 100,
	left: 100,
}

const Board = ({width, height, fields}) => {

	const [ gameState, setGameState ] = useState({ currentField: 0 })

	const h = height - margins.top - margins.bottom
	const w = width - margins.left - margins.right

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margins.left}, ${margins.top})`}>
				<Grid fields={fields} size={w}/>
			</g>
		</svg>
	)
}

Board.defaultProps = {
	width: 400,
	height: 400,
	fields: [],
}

export default Board