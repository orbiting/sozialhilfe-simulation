import React from 'react'

import chunk from 'lodash/chunk'
import range from 'lodash/range'
import {FIELD_SIDE_RATIO} from './constants'
import Lane from './Lane'
import { GAME_INITIAL_STATE } from './App';
import { AVATARS } from './Layout';

const Board = ({ fields, boardSize, gameState, avatar }) => {

	const [bottom, left, top, right] = chunk(fields, 4)

	const shortSide = boardSize / (3 + 2 * FIELD_SIDE_RATIO)
	const longSide = FIELD_SIDE_RATIO * shortSide
	const laneSize = boardSize-longSide

	return (

		<g>
			<Lane avatar={avatar} gameState={gameState} boardSize={boardSize} fields={bottom} x={longSide} y={laneSize} start />
			<Lane gameState={gameState} boardSize={boardSize} fields={left} rotate={90} x={longSide} y={longSide} />
			<Lane gameState={gameState} boardSize={boardSize} fields={right} rotate={-90} x={laneSize} y={laneSize} />
			<Lane gameState={gameState} boardSize={boardSize} fields={top} rotate={180} x={laneSize} y={longSide} />
		</g>

	)
}

Board.defaultProps = {
	boardSize: 500,
  fields: range(0,96).map(i => ({})),
  gameState: GAME_INITIAL_STATE,
  avatar: AVATARS[0]
}

export default Board