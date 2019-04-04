import React from 'react'

import { chunk } from 'lodash'
import {FIELD_SIDE_RATIO} from './constants'
import Lane from './Lane'

const Board = ({ fields, boardSize }) => {

	const [right, bottom, left, top] = chunk(fields, 4)

	const shortSide = boardSize / (3 + 2 * FIELD_SIDE_RATIO)
	const longSide = FIELD_SIDE_RATIO * shortSide
	const laneSize = boardSize-longSide

	return (

		<g>
			<Lane boardSize={boardSize} fields={bottom} x={longSide} y={laneSize} start />
			<Lane boardSize={boardSize} fields={left} rotate={90} x={longSide} y={longSide} />
			<Lane boardSize={boardSize} fields={right} rotate={-90} x={laneSize} y={laneSize} />
			<Lane boardSize={boardSize} fields={top} rotate={180} x={laneSize} y={longSide} />
		</g>

	)
}

Board.defaultProps = {
	boardSize: 500,
	fields: []
}

export default Board