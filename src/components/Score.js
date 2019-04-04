import React from 'react'
import { FIELD_SIDE_RATIO } from './constants'
import theme from './theme'
import Text from './Text'


const Score = ({width, boardSize}) => {

  const height = width / 3
  const padding = width / 50

  return (
    <g>
      <rect width={width} height={height} fill={theme.score}></rect>
      {/*<image xlinkHref="https://helpx.adobe.com/content/dam/help/mnemonics/ai_cc_app_RGB.svg" x={padding} y={padding} height="50px" width="50px"/>*/}
      <Text size={boardSize / 6} type={'large'} x={padding} y={padding} alignmentBaseline='hanging' textAnchor='start' fill={'#fff'}>Kontostand</Text>
    </g>
  )
}

export default Score
