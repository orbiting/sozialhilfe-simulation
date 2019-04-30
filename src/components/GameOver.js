import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';
import { Button } from '@project-r/styleguide'


import textRaw from '../../text.json'
const text = textRaw.data.reduce((acc,{key,value}) => {  acc[key] = value; return acc }, {})


const GameOver = ({gameState, width, height, tryAgain, resetGame, boardSize, show, avatar}) => {

  const { balance } = gameState

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

  const listItem = css({
    ...fonts(boardSize).small,
    color: '#fff'
  })
  
  return (
    <div {...wrapper}>
      <div {...base}>
      {
        balance < 0 ? (
          <>
            <p {...textStyle}>{text.outro8.replace('{amount}', formatAmount(avatar.startingBalance))}</p>
            <Button black onClick={tryAgain}>Neu starten</Button>
          </>
        ) : (
          <div style={{overflowY: 'scroll'}}>
            <p {...textStyle}>{text.outro6.replace('{amount}', formatAmount(avatar.startingBalance))}</p>
            <ul {...listItem}>
              {
                gameState.transactions.filter(t => t.reject).filter(t => t.field.outro).map(t => <li {...listItem}>{t.field.outro}</li>)
              }
            </ul>
            <p {...textStyle}>{text.outro7}</p>
            <Button black onClick={resetGame}>Nochmals spielen</Button>
          </div>
        )
      }

      </div>
    </div>
  )

}

export default GameOver