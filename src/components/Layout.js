import React, { useEffect, useRef, useState } from 'react'
import { Container, NarrowContainer, Center, Editorial, Interaction, Button, mediaQueries } from '@project-r/styleguide'

import theme from './theme'
import { css } from 'glamor'
import App, { GAME_INITIAL_STATE } from './App'
import { scrollIt } from './scroll';
import Board from './Board';
import { HEADER_HEIGHT_MOBILE, HEADER_HEIGHT } from './constants'

import textRaw from '../../text.json'

const text = textRaw.data.reduce((acc,{key,value}) => {  acc[key] = value; return acc }, {})
const maxHeight = 1000

const Game = ({ size }) => {
  return (
    <div style={{background: theme.background, width: size.innerWidth, height: size.panelHeight, display: 'flex'}}>
      {/*<div style={{background: 'coral', width: size.width + (size.innerWidth - size.width)/2, height: 800}} />*/}
      {/*<div style={{background: '#991214', width: (size.innerWidth - size.width)/2, height: 200}} />*/}
      <App centerWidth={size.centerWidth} marginWidth={size.marginWidth} height={size.panelHeight} />
    </div>
  )
}

const Panel = ({size, children}) => {
  return (
    <div style={{ width: '100%', height: size.panelHeight }}>
      {children}
    </div>
  )
}

const Layout = () => {

  const [ size, setSize ] = useState()
  const centerRef = useRef(null)

  const [ introState, setIntroState ] = useState({
    avatar: undefined,
    stage: 0
  })

  const measure = () => {
    if (centerRef.current) {
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      const headerHeight = mobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT
      const { width, height } = centerRef.current.getBoundingClientRect()
      const offsetTop = centerRef.current.offsetTop
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      const marginWidth = (innerWidth - width)/2
      const panelHeight = Math.min(maxHeight, innerHeight) - headerHeight
      setSize({ centerWidth: width, centerHeight: height, offsetTop, innerWidth, innerHeight, mobile, marginWidth, panelHeight })
    }
  }
  useEffect(
    () => { measure() }, []
  )
  useEffect(
    () => {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
  )
  useEffect(
    () => {
      size && scrollIt(introState.stage * size.panelHeight + size.offsetTop)
    },
    [introState]
  )

  return (
    <>
      <Center style={{paddingBottom: 0}}>
        <div ref={centerRef} style={{background: theme.background, padding: 10}}>
        {
          size ? (
            <>
              <Panel size={size}>
                <div style={{display: 'flex'}}>
                  <div style={{width: '50%', paddingRight: 10}} onClick={() => setIntroState({avatar: 1, stage: 1})}>
                    <Interaction.H3>
                      {text['avatar1title']}
                    </Interaction.H3>
                    <Interaction.P>
                      {text['avatar1body']}
                    </Interaction.P>
                  </div>
                  <div style={{width: '50%', paddingLeft: 10}} onClick={() => setIntroState({avatar: 2, stage: 1})}>
                    <Interaction.H3>
                      {text['avatar2title']}
                    </Interaction.H3>
                    <Interaction.P>
                      {text['avatar2body']}
                    </Interaction.P>
                  </div>
                </div>
              </Panel>
              {
                introState.avatar && 
                <>
                  <Panel size={size}>
                    <div>
                      <div style={{width: '100%', paddingRight: 10}} onClick={() => setIntroState({...introState, stage: 1})}>
                        <Interaction.H3>
                          {text['intro1']}
                        </Interaction.H3>
                        <Interaction.P>
                          {text['intro2']}
                        </Interaction.P>
                      </div>
                      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <svg width={(size.centerWidth-20)*0.5} height={(size.centerWidth-20)*0.5}>
                          <Board boardSize={(size.centerWidth-20)*0.5} gameState={GAME_INITIAL_STATE} />
                        </svg>
                      </div>
                    </div>
                  </Panel>
                  <Panel size={size}>
                    <div>
                      <div style={{width: '100%', paddingRight: 10}} onClick={() => setIntroState({...introState, stage: 2})}>
                        <Interaction.H3>
                          {text['intro3']}
                        </Interaction.H3>
                        <Interaction.P>
                          {text['intro4']}
                        </Interaction.P>
                      </div>
                    </div>
                  </Panel>
                </>
              }
            </>
          ) : (
            null
          )
        }
        </div> 
      </Center>
      {
        introState.avatar &&
        <Game size={size} />
      }
    </>
  )
}

export default Layout
