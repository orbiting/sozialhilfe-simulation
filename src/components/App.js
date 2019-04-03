import React, { useState, useRef, useEffect } from 'react'
import Board from './Board'
import { transition } from 'd3-transition'
import { select  } from 'd3-selection'
import { easeLinear, easeCubic, easeElastic } from 'd3-ease'

import fields from '../../fields'
import constants from './constants'

const App = () => {

  const [ rotation, setRotation ] = useState(0)
  const boardRef = useRef(null)

  useEffect(
    () => {
      Math.abs(rotation) > 0 && select(boardRef.current).transition().attr('transform', `rotate(${rotation}, ${boardSize/2}, ${boardSize/2})` ).ease(easeCubic)
    }
  )

  const width = 200, height = 400
  const boardSize = height * 2

  const handleScroll = e => {
    setRotation(rotation-22.5)
  }

  const rotationAxis = boardSize / 7 * 5 / 2

  return (
    <div style={{position: 'relative', width, height}} onTouchStart={handleScroll} onWheel={handleScroll}>
      <svg width={width} height={height}>
        <g transform={`translate(${-boardSize+rotationAxis}, ${-boardSize+rotationAxis+height/2})`}>
          <g ref={boardRef}>
            <Board width={boardSize} height={boardSize} fields={fields.data} />
          </g>
        </g>
      </svg>
    </div>
  )

}


export default App
