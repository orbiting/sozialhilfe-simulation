import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'
import { get, reverse } from 'lodash'


const Lane = ({fields, size, rotate, x, y}) => {

  const shortSide = size / 4.5

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      {
        reverse(fields).map(
          (c,i) => i===fields.length-1 ? (
            <Chance size={shortSide} field={get(fields, i)} x={3*shortSide}/>
          ) : (
            <Field size={shortSide} field={get(fields, i)} x={i*shortSide}/>
          )
        )
      }
    </g>
  )

}

Lane.defaultProps = {
  fields: [],
  size: 500,
  rotate: 0,
  x: 0,
  y: 0,
}

export default Lane