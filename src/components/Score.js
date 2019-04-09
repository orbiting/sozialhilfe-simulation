import React , { useState } from 'react'
import theme from './theme'
import Text, { fonts } from './Text'

const Score = ({gameState, setGameState, width, boardSize}) => {

  const padding = boardSize / 80
  const height = padding * 18
  const w = width - 2 * padding
  const h = height - 2 * padding

  const { balance, budget: { leisure, mobility, media } } = gameState.score

  const leftWidth = mobility * w
  const rightWidth = media * w
  const centerWidth = w - leftWidth - rightWidth

  const [ leftDraggable, setLeftDraggable ] = useState(null)
  const [ rightDraggable, setRightDraggable ] = useState(null)

  const updateGameState = position => (arg) => {
    if (leftDraggable || rightDraggable) {
      let nextScore = {...gameState.score}
      if (position === 'left') {
        const delta = ((arg.clientX === 0 ? 0.001 : arg.clientX)-leftDraggable)
        nextScore.budget = {
          ...nextScore.budget,
          mobility: (leftWidth + delta) / w,
        }
      } else {

      }
      setGameState({ ...gameState, score: nextScore })
    }
  }

  return (
    <g>
      <rect width={width} height={height} fill={theme.score} opacity={0.9}></rect>
      <g  transform={`translate(${padding}, ${0})`}>
        {/*<image xlinkHref="https://helpx.adobe.com/content/dam/help/mnemonics/ai_cc_app_RGB.svg" x={padding} y={padding} height="50px" width="50px"/>*/}
        <text alignmentBaseline='hanging' y={padding} fill={'#000'} style={fonts(boardSize).large} >Kontostand</text>
        <text alignmentBaseline='hanging' y={4*padding} fill={'#000'} style={fonts(boardSize).regular} >Nahrung, Hygiene und Stromkosten</text>
        <rect y={6*padding} width={w} height={1.5*padding} />

        <g  transform={`translate(${0}, ${9*padding})`}>
          <text alignmentBaseline='hanging' fill={'#000'} style={fonts(boardSize).regular} >Mobilität</text>
          <rect y={2*padding} width={leftWidth} height={1.5*padding} fill={theme.categories.mobilityBg} />
          <rect y={2*padding} width={10} height={1.5*padding} fill={theme.categories.mobility} />

          <text x={leftWidth} alignmentBaseline='hanging' fill={'#000'} style={fonts(boardSize).regular} >Freizeit</text>
          <rect x={leftWidth} y={2*padding} width={centerWidth} height={1.5*padding} fill={theme.categories.leisureBg} />
          <rect x={leftWidth} y={2*padding} width={10} height={1.5*padding} fill={theme.categories.leisure} />

          <text x={w-rightWidth} alignmentBaseline='hanging' fill={'#000'} style={fonts(boardSize).regular} >Medien</text>
          <rect x={w-rightWidth} y={2*padding} width={rightWidth} height={1.5*padding}  fill={theme.categories.mediaBg} />
          <rect x={w-rightWidth} y={2*padding} width={10} height={1.5*padding}  fill={theme.categories.media} />
        </g>

        <circle
          r={boardSize/50}
          fill={theme.background}
          cy={15*padding}
          cx={leftWidth}
          onMouseDown={e => { e.stopPropagation(); setLeftDraggable(e.clientX)}}
          onMouseMove={updateGameState('left')}
          onMouseUp={() => setLeftDraggable(null)}
          onMouseLeave={() => setLeftDraggable(null)}
        />
        <circle
          r={boardSize/50}
          fill={theme.background}
          cy={15*padding}
          cx={w-rightWidth}
          onMouseDown={e => { e.stopPropagation(); setRightDraggable(e.clientX)}}
          onMouseMove={updateGameState('right')}
          onMouseUp={() => setRightDraggable(null)}
          onMouseLeave={() => setRightDraggable(null)}
        />
      </g>
    </g>
  )
}

export default Score
