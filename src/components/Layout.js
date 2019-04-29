import React, { useEffect, useRef, useState } from 'react'
import {
  Center,
  Interaction,
  mediaQueries,
} from '@project-r/styleguide'

import theme from './theme'
import { css } from 'glamor'
import App from './App'
import { scrollIt } from './scroll'
import Board from './Board'
import { HEADER_HEIGHT_MOBILE, HEADER_HEIGHT } from './constants'
import AVATARS from './avatars'
import { Cancel } from './icons'

const maxHeight = 900

const AvatarButton = ({ avatar, activeAvatar, setAvatar }) =>
  !activeAvatar || activeAvatar.id === avatar.id ? (
    <div
      style={{
        width: '50%',
        textAlign: 'center',
        opacity:
          activeAvatar && activeAvatar.id === avatar.id ? 1 : 0.6,
      }}
      onClick={() => setAvatar(avatar)}
    >
      <avatar.Icon width={80} height={80} />
      <Interaction.P>
        <span style={{ color: '#fff' }}>{avatar.name}</span>
      </Interaction.P>
    </div>
  ) : (
    <div
      {...css({
        width: '50%',
        textAlign: 'center',
        opacity: 0.6,
      })}
      onClick={() => setAvatar(null)}
    >
      <Cancel width={80} height={80} />
      <Interaction.P>
        <span style={{ color: '#fff' }}>Abbrechen</span>
      </Interaction.P>
    </div>
  )

const Layout = () => {
  const [size, setSize] = useState(null)
  const [started, setStarted] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const centerRef = useRef(null)
  const gameRef = useRef(null)

  const measure = () => {
    if (centerRef.current) {
      const mobile = window.innerWidth < mediaQueries.mBreakPoint
      const headerHeight = mobile
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT
      const { offsetWidth } = centerRef.current
      const width = offsetWidth
      const innerWidth = window.document.body.clientWidth
      const innerHeight =
        size &&
        size.innerHeight - window.document.body.innerHeight === 75
          ? size.innerHeight
          : window.innerHeight

      const marginWidth = (innerWidth - width) / 2
      const panelHeight =
        Math.min(maxHeight, innerHeight) - headerHeight

      setSize({
        centerWidth: width,
        innerWidth,
        innerHeight,
        mobile,
        marginWidth,
        panelHeight,
        headerHeight,
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

  useEffect(() => {
    avatar && scrollIt(gameRef.current.offsetTop - size.headerHeight);
  }, [avatar])

  return (
    <>
      <Center style={{ paddingBottom: 0 }}>
        <div ref={centerRef}>
          {size ? (
            <div
              {...css({
                background: theme.background,
                position: 'relative',
                padding: size.centerWidth * 0.05,
              })}
            >
              <div
                {...css({
                  position: size.mobile ? 'relative' : 'absolute',
                  top: size.mobile ? 0 : size.centerWidth * 0.3,
                  marginLeft: size.mobile
                    ? 0
                    : size.centerWidth * 0.25,
                  marginRight: size.mobile
                    ? 0
                    : size.centerWidth * 0.25,
                  width: size.mobile
                    ? size.centerWidth * 0.9
                    : size.centerWidth * 0.4,
                  textAlign: 'center',
                })}
              >
                <Interaction.P
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    paddingTop: '2%',
                    lineHeight: 1.2,
                  }}
                >
                  Auf den Ereignisfeldern tätigen Sie alltägliche
                  Ausgaben.
                </Interaction.P>
              </div>
              <svg
                width={size.centerWidth * 0.9}
                height={size.centerWidth * 0.85}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  transform={`translate(${size.centerWidth *
                    0.05},${size.centerWidth * 0.025})`}
                >
                  <Board boardSize={size.centerWidth * 0.8} />
                </g>
              </svg>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '5%',
                }}
              >
                <div style={{ display: 'flex' }}>
                  <Interaction.P
                    style={{
                      color: '#fff',
                      width: '50%',
                      paddingRight: '10%',
                      textAlign: 'left',
                      lineHeight: 1.2,
                    }}
                  >
                    Auf den «Chance»-Feldern entscheiden Sie über
                    grössere Beträge.
                  </Interaction.P>
                  <Interaction.P
                    style={{
                      color: '#fff',
                      width: '50%',
                      paddingLeft: '10%',
                      textAlign: 'right',
                      lineHeight: 1.2,
                    }}
                  >
                    Auf «Start» erhalten Sie den monatlichen
                    Grundbedarf.
                  </Interaction.P>
                </div>
              </div>
              {avatar ? (
                <Interaction.P
                  style={{ color: '#fff', paddingBottom: '5%' }}
                >
                  Sie sind unterwegs als
                </Interaction.P>
              ) : (
                <Interaction.P
                  style={{ color: '#fff', paddingBottom: '5%' }}
                >
                  Durch Klick auf ein Symbol wählen Sie Ihren Avatar
                </Interaction.P>
              )}
              <div
                {...css({
                  display: 'flex',
                  padding: '0 0 1% 0',
                })}
              >
                <AvatarButton
                  avatar={AVATARS[0]}
                  activeAvatar={avatar}
                  setAvatar={setAvatar}
                />
                <AvatarButton
                  avatar={AVATARS[1]}
                  activeAvatar={avatar}
                  setAvatar={setAvatar}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Center>
      <div
        ref={gameRef}
        onClick={() => {
          setStarted(true)
          scrollIt(gameRef.current.offsetTop - size.headerHeight)
        }}
      >
        {size && (
          <div
            {...css({
              width: size.innerWidth,
              height: avatar ? size.panelHeight : 0,
              position: 'relative',
              overflow: 'hidden',
            })}
          >
            <div
              {...css({
                position: 'absolute',
                top: avatar ? 0 : -size.panelHeight,
                transition: 'top 0.5s ease-in-out',
              })}
            >
              {avatar && (
                <App
                  centerWidth={size.centerWidth}
                  marginWidth={size.marginWidth}
                  height={size.panelHeight}
                  mobile={size.mobile}
                  avatar={avatar}
                  started={started}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
