import React, { useState } from 'react'
import Field from './Field'
import Chance from './Chance'
import { get, reverse } from 'lodash'


const Lane = ({fields, size, children}) => {

  const shortSide = size / 5

  return (
    <g transform={`rotate(0)`}>
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
  size: 500
}

export default Lane