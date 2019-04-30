import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';
import { Button, Interaction } from '@project-r/styleguide'


import textRaw from '../../text.json'
import { MAX_DEBIT } from './constants';
const text = textRaw.data.reduce((acc,{key,value}) => {  acc[key] = value; return acc }, {})


const GameOver = ({gameState, width, height, tryAgain, resetGame, boardSize, show, avatar}) => {

  const { balance } = gameState

  const wrapper = css({
    position: 'absolute',
    width,
    height,
    overflow: 'hidden',
  })

  const base = css({
    pointerEvents: show ? 'auto' : 'none',
    position: 'absolute',
    padding: 15,
    background: theme.help,
    opacity: show ? 0.95 : 0,
    width,
    maxHeight: height*0.8,
    overflowY: 'auto',
    transition: 'opacity 0.1s ease-in-out',
    boxSizing: 'border-box',
    color: theme.text,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  })

  const textStyle = css({
    ...fonts(boardSize).regular,
    color: '#fff',
    lineHeight: 1.2,
    margin: '1rem 0'
  })

  const list = css({
    listStyle: 'square inside', 
    padding: 0,
    margin: 0,
  })

  const listItem = css({
    ...fonts(boardSize).small,
    color: '#fff'
  })
  
  return (
    <div {...wrapper}>
      <div {...base}>
      {
        (balance < MAX_DEBIT) ? (
          <>
            <p {...textStyle} style={{marginTop: 0}}>{text.outro8.replace('{amount}', avatar.startingBalance)}</p>
            <Button white onClick={tryAgain}>Neu starten</Button>
          </>
        ) : (
          <>
            <Interaction.P {...textStyle} style={{marginTop: 0}}>{text.outro6.replace('{amount}', avatar.startingBalance)}</Interaction.P>
            <div {...css({
              height: height/3,
              overflowY: 'auto',
            })}>
              <ul {...list}>
                {
                  gameState.transactions.filter(t => t.reject).filter(t => t.field.outro).map(t => <li {...listItem}>{t.field.outro}</li>)
                }
              </ul>
            </div>
            <Interaction.P {...textStyle}>{text.outro7}</Interaction.P>
            <Button white onClick={resetGame}>Nochmals spielen</Button>
          </>
        )
      }

      </div>
    </div>
  )

}

export default GameOver