import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  NarrowContainer,
  Center,
  Editorial,
  Interaction,
  Button,
  mediaQueries,
} from '@project-r/styleguide'

import theme from './theme'
import { css } from 'glamor'
import App, { GAME_INITIAL_STATE } from './App'
import { scrollIt } from './scroll'
import Board from './Board'
import { HEADER_HEIGHT_MOBILE, HEADER_HEIGHT } from './constants'
import Text, { fonts, formatAmount } from './Text'
import { Avatar1, Avatar2, Continue, Cancel } from './icons'

import textRaw from '../../text.json'

const text = textRaw.data.reduce((acc, { key, value }) => {
  acc[key] = value
  return acc
}, {})
const maxHeight = 900

export const AVATARS = [
  {
    id: 0,
    name: 'Hans Muster',
    startingBalance: 986,
    Icon: Avatar1,
  },
  {
    id: 1,
    name: 'Barbara Beispiel',
    startingBalance: 1834,
    Icon: Avatar2
  },
]

const Layout = () => {
  const [size, setSize] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const centerRef = useRef(null)
  const gameRef = useRef(null)

  const [introState, setIntroState] = useState({
    avatar: undefined,
    stage: 0,
  })

  const measure = () => {
    if (centerRef.current) {
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      const headerHeight = mobile
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT
      const {
        width,
        height,
      } = centerRef.current.getBoundingClientRect()
      const offsetTop = gameRef.current.offsetTop - headerHeight
      const innerWidth = window.innerWidth
      const innerHeight =
        size && size.innerHeight - window.innerHeight === 75
          ? size.innerHeight
          : window.innerHeight
      const marginWidth = (innerWidth - width) / 2
      const panelHeight =
        Math.min(maxHeight, innerHeight) - headerHeight
      setSize({
        centerWidth: width,
        centerHeight: height,
        offsetTop,
        innerWidth,
        innerHeight,
        mobile,
        marginWidth,
        panelHeight,
      })
    }
  }

  useEffect(() => {
    measure()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  })

  const activate = avatar => {
    setAvatar(avatar)
    scrollIt(size.offsetTop)
  }

  const AvatarButton = ({avatar, activeAvatar}) =>
    (!activeAvatar || activeAvatar.id === avatar.id) ? (
      <div
        style={{
          width: '50%',
          textAlign: 'center',
          opacity: activeAvatar && activeAvatar.id === avatar.id ? 1 : 0.5,
        }}
        onClick={() => activate(avatar)}
      >
        <avatar.Icon width={80} height={80} />
        <Interaction.P>
          <span style={{ color: '#fff' }}>
            {avatar.name}
          </span>
        </Interaction.P>
      </div>
    ) : (
      <div
        style={{
          width: '50%',
          textAlign: 'center',
          opacity: 0.5,
        }}
        onClick={() => setAvatar(null)}
      >
        <Cancel width={80} height={80} />
        <Interaction.P>
          <span style={{ color: '#fff' }}>
            Abbrechen
          </span>
        </Interaction.P>
      </div>  
    )


  return (
    <>
      <Center style={{ paddingBottom: 0 }}>
        <div
          ref={centerRef}
          style={{
            background: theme.background,
            padding: '5%',
            position: 'relative',
            display: 'flex',
          }}
        >
          <AvatarButton avatar={AVATARS[0]} activeAvatar={avatar} />
          <AvatarButton avatar={AVATARS[1]} activeAvatar={avatar} />
        </div>
      </Center>
      <div ref={gameRef} onClick={() => scrollIt(size.offsetTop)}>
        {avatar && (
          <div
            style={{
              background: theme.background,
              width: size.innerWidth,
              height: size.panelHeight,
              display: 'flex',
            }}
          >
            <App
              centerWidth={size.centerWidth}
              marginWidth={size.marginWidth}
              height={size.panelHeight}
              mobile={size.mobile}
              avatar={avatar}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
