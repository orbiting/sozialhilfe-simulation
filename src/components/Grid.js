import React from 'react'

import { chunk } from 'lodash'
import constants from './constants'
import Lane from './Lane'

const Grid = ({ fields, size }) => {

	const [right, bottom, left, top] = chunk(fields, 4)

  const shortSide = size / (3 + 2 * constants.FIELD_SIDE_RATIO)
  const longSide = constants.FIELD_SIDE_RATIO * shortSide
	const laneSize = size-longSide

	return (

    <g>
			<Lane size={laneSize} fields={bottom} x={longSide} y={laneSize} />
			<Lane size={laneSize} fields={left} rotate={90} x={longSide} y={longSide} />
			<Lane size={laneSize} fields={right} rotate={-90} x={laneSize} y={laneSize} />
			<Lane size={laneSize} fields={top} rotate={180} x={laneSize} y={longSide} />
    </g>

	)
}

Grid.defaultProps = {
	size: 500,
	fields: []
}

export default Grid