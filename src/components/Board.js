import React from 'react'

import chunk from 'lodash/chunk'
import range from 'lodash/range'
import {FIELD_SIDE_RATIO} from './constants'
import Lane from './Lane'
import AVATARS from './avatars';

const Board = ({ fields, boardSize, gameState, avatar, blink }) => {
  
	const [bottom, left, top, right] = chunk(fields, 4)

	const shortSide = boardSize / (3 + 2 * FIELD_SIDE_RATIO)
	const longSide = FIELD_SIDE_RATIO * shortSide
	const laneSize = boardSize-longSide

	return (

		<g>
			<Lane blink={blink} avatar={avatar} gameState={gameState} boardSize={boardSize} fields={bottom} x={longSide} y={laneSize} start />
			<Lane blink={blink} gameState={gameState} boardSize={boardSize} fields={left} rotate={90} x={longSide} y={longSide} />
			<Lane blink={blink} gameState={gameState} boardSize={boardSize} fields={right} rotate={-90} x={laneSize} y={laneSize} />
			<Lane blink={blink} gameState={gameState} boardSize={boardSize} fields={top} rotate={180} x={laneSize} y={longSide} />
		</g>

	)
}

Board.defaultProps = {
	boardSize: 500,
  fields: range(0,96).map(i => ({})),
  gameState: { transactions: [], round: 1, activeField: 1 },
  avatar: AVATARS[0]
}

export default Board