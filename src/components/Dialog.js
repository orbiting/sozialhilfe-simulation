import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts } from './Text'


const Dialog = ({field, size, advanceGame, boardSize, show,}) => {
  const {description, yes, no, id, amount} = field

  const wrapper = css({
    display: 'none',
    position: 'absolute',
    overflow: 'hidden',
    bottom: 0,
    width: size,
    height: size,
    pointerEvents: 'none',
  })
  const base = css({
    top: 400,
    boxSizing: 'border-box',
    padding: 20,
    background: theme.field,
    pointerEvents: 'auto',
  })
  const fadeIn = css({
    display: 'block',
    bottom: 0,
    transition: 'bottom 0.3s ease-in-out',
  })

  const text = css({
    ...fonts(boardSize).regular
  })
  const action = css({
    ...fonts(boardSize).bold,
    cursor: 'pointer',
  })
  const price = css({
    ...fonts(boardSize).huge,
    textAlign: 'center',
    marginTop: 5,
    cursor: 'pointer',
  })

  return (
    <div {...wrapper}>
      <div {...base}>
        <div {...text}>
          { description }
        </div>
        <div {...price}>
          sFr. { -amount }
        </div>
        <p {...action} onClick={() => advanceGame(field)}>{yes}</p>
        <p {...action} onClick={() => advanceGame(field, true)}>{no}</p>
      </div>
    </div>
  )

}

export default Dialog
