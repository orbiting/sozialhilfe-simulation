import React, { useState } from 'react'
import Field from './Field'

const margins = {
	top: 5,
	right: 5,
	bottom: 5,
	left: 5,
}

const Board = ({width, height}) => {

	const [ gameState, setGameState ] = useState({ currentField: 0 })

	const h = height - margins.top - margins.bottom
	const w = width - margins.left - margins.right

	return (
		<svg width={w} height={h}>
			<g transform={`translate(${margins.left}, ${margins.top})`}>
			{
				[0,1,2,3,4].map(
					i => <g key={i} transform={`translate(0,${i*100})`}><Field /></g>
				)
			}
			</g>
		</svg>
	)
}

Board.defaultProps = {
	width: 800,
	height: 800
}

export default Board