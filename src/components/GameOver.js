import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';
import { Button } from '@project-r/styleguide'


import textRaw from '../../text.json'
const text = textRaw.data.reduce((acc,{key,value}) => {  acc[key] = value; return acc }, {})


const GameOver = ({gameState, width, height, resetGame, boardSize, show, avatar}) => {

  const { balance } = gameState.score

  const wrapper = css({
    position: 'absolute',
    width,
    height,
    overflow: 'hidden',
    pointerEvents: show ? undefined : 'none',
  })

  const base = css({
    position: 'absolute',
    height,
    padding: 15,
    background: '#777',
    opacity: show ? 1 : 0,
    width,
    transition: 'opacity 0.3s ease-in-out',
    boxSizing: 'border-box',
    color: theme.text,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  })

  const textStyle = css({
    ...fonts(boardSize).regular,
    color: '#fff'
  })
  const action = css({
    ...fonts(boardSize).bold,
    cursor: 'pointer',
    width: '50%',
    padding: '0 3%',
    marginTop: 0,
    textAlign: 'center',
  })
  const price = css({
    ...fonts(boardSize).large,
    textAlign: 'center',
    margin: '8% 0',
    cursor: 'pointer',
  })
  
  return (
    <div {...wrapper}>
      <div {...base}>
      {
        balance < 0 ? (
          <>
            <p {...textStyle}>{text.outro8.replace('{amount}', formatAmount(avatar.startingBalance))}</p>
            <Button black onClick={resetGame}>Neu starten</Button>
          </>
        ) : (
          <div>
            <p {...textStyle}>{text.outro6.replace('{amount}', formatAmount(avatar.startingBalance))}</p>
            <ul>
              {
                gameState.transactions.completed.filter(t => t.reject).map(t => <li>{t.field.outro}</li>)
              }
            </ul>
            <p {...textStyle}>{text.outro7}</p>
          </div>
        )
      }

      </div>
    </div>
  )

}

export default GameOver