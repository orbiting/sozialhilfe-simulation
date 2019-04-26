import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';
import { Button } from '@project-r/styleguide'


import textRaw from '../../text.json'
const text = textRaw.data.reduce((acc,{key,value}) => {  acc[key] = value; return acc }, {})

const AVATARS = [
  {
    name: 'Hans Muster',
    staringBalance: 986,
  },
  {
    name: 'Barbara Beispiel',
    staringBalance: 1834,
  },
]

const AvatarPicker = ({gameState, setGameState, width, height, boardSize}) => {

  const { avatar } = gameState
  const show = !avatar

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
    top: show ? 0 : height,
    width,
    transition: 'top 0.3s ease-in-out',
    boxSizing: 'border-box',
    color: theme.text,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  })

  const textStyle = css({
    ...fonts(boardSize).large,
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

  const setAvatar = (avatar) => setGameState({...gameState, avatar})

  return (
    <div {...wrapper}>
      <div {...base}>
      {
        AVATARS.map((a) => <h2 {...textStyle} onClick={() => setAvatar(a)}>{a.name}</h2>)
      }
      </div>
    </div>
  )

}

export default AvatarPicker
