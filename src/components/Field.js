import React from 'react'
import {FIELD_SIDE_RATIO} from './constants'
import theme from './theme'
import Text from './Text'
import { css } from 'glamor'
import { select } from 'd3-selection'

export const styles = {
  active: css({
    fillOpacity: 0,
    transition: 'fill-opacity 0.3s ease-in-out'
  }),
  inactive: css({
    fillOpacity: 1,
    transition: 'fill-opacity 0.3s ease-in-out'
  }),
  highlightOn: css({
    fill: theme.field,
    fillOpacity: 0,
    transition: 'fill-opacity 0.3s ease-in-out'
  }),
  highlightOff: css({
    fill: theme.field,
    fillOpacity: 0.5,
    transition: 'fill-opacity 0.3s ease-in-out'
  }),
}

const Field = ({field: { description, amount, category, id }, boardSize, x, y, rotate, offsetY, active, highlight = false }) => {

  const width = boardSize / 6
  const height = FIELD_SIDE_RATIO*width
  const widthUnit = width / 10
  const heightUnit = height / 12

  const curtainRef = React.useRef(null)

  React.useEffect(
    () => {
      curtainRef.current && select(curtainRef.current)
        .transition().attr('height', highlight ? height : 2*heightUnit)
    },
    [highlight]
  )

  return (
    <>
      <g transform={`translate(${x}, ${y}) rotate(${rotate}, ${width/2}, ${width/2} ) translate(0, ${offsetY})`}>
        <rect width={width} height={height} fill={theme.field} />
        <rect ref={curtainRef} width={width} height={2*heightUnit} fill={theme.categories[category]} />
        <>
          <Text boardSize={boardSize} x={width/2} y={3.5*heightUnit} charsPerLine={8} fillOpacity={1} fill={highlight ? '#fff' : undefined} {...(!active ? styles.active : styles.inactive)}>{description}</Text>
          <Text boardSize={boardSize} x={width/2} y={8*heightUnit} type={'bold'} fill={highlight ? '#fff' : undefined} {...(!active ? styles.active : styles.inactive)} charsPerLine={5}>
            {`${Math.floor(amount) === amount ? -amount+'.–' : -amount  }`}
          </Text>
        </>
        <>
          <rect x={widthUnit} y={2.5*heightUnit} width={8*widthUnit} height={heightUnit} {...(active ? styles.active : styles.inactive)} fill={theme.placeholder}/>
          <rect x={widthUnit} y={4*heightUnit} width={8*widthUnit} height={heightUnit}  {...(active ? styles.active : styles.inactive)}fill={theme.placeholder}/>
          <rect x={widthUnit} y={5.5*heightUnit} width={8*widthUnit} height={heightUnit}  {...(active ? styles.active : styles.inactive)}fill={theme.placeholder}/>
          <rect x={4*widthUnit} y={8*heightUnit} width={2*widthUnit} height={heightUnit}  {...(active ? styles.active : styles.inactive)}fill={theme.placeholder}/>
        </>
        <rect width={width} height={height} {...(highlight ? styles.highlightOn : styles.highlightOff)} />
        <rect width={width} height={height} strokeWidth={1} stroke={theme.border} fill='none' />
      </g>
    </>
  )

}

Field.defaultProps = {
  boardSize: 1200,
  field: {
    description: '',
    amount: 0,
  },
  x: 0,
  y: 0,
  rotate: 0,
  offsetY: 0,
  active: true,
}

export default Field