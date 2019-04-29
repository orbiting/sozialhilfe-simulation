import React, { useState } from 'react'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import reverse from 'lodash/reverse'

import { css } from 'glamor'
import icons from './icons'
import AVATARS from './avatars'

const MONTHS = ['Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt']

const LogInfoItem = ({boardSize, width, category}) => {

  const icon = icons[category] || icons.general

  return (
    <div
      {...css({
        ...fonts(boardSize).tiny,
        boxSizing: 'border-box',
        padding: 5,
        width,
        background: theme.categories[category],
        color: '#fff',
      })}
    >
      <icon.Icon fill={'#fff'} width={20} height={20} />
      <br />
      {icon.label}
    </div>
  )
}

const Score = ({
  gameState,
  field = {},
  width,
  height,
  boardSize,
  started,
}) => {

  const padding = boardSize / 120
  const w = width - 2 * padding

  const transactionLog = gameState.transactions.map(
    (t, i, arr) => {
      const icon = icons[t.field.category] || icons.general
      const generalIcon = icons.general
      return (
        <span style={{ background: theme.score }}>
          {!t.reject && (
            <div
              key={`p${t.field.id}`}
              {...css({
                ...fonts(boardSize).tiny,
                display: 'inline-block',
                width: width / 7,
                padding: 5,
                background:
                  theme.categories[t.field.category] ||
                  theme.placeholderDark,
                color: '#fff',
              })}
            >
              <span style={{
                opacity: i === arr.length - 1 ? 1 : 0.5,
              }}>
                <icon.Icon fill={'#fff'} width={20} height={20} />
                <br />
                {formatAmount(t.field.amount, true)}
              </span>
            </div>
          )}
          <div
            key={`a${t.field.id}`}
            {...css({
              ...fonts(boardSize).tiny,
              display: 'inline-block',
              width: width / 7,
              padding: 5,
              background: theme.categories['general'],
              color: '#fff',
            })}
          >
            <span style={{
              opacity: i === arr.length - 1 ? 1 : 0.4,
            }}>
              <generalIcon.Icon fill={'#fff'} width={20} height={20} />
              <br />
              {formatAmount(t.field.pauschal, true)}
            </span>
          </div>
        </span>
      )
    },
  )

  const LogInfo = () => (
    <>
      <LogInfoItem boardSize={boardSize} category='general' width={width / 6} />
      <LogInfoItem boardSize={boardSize} category='life' width={width / 6} />
      <LogInfoItem boardSize={boardSize} category='leisure' width={width / 6} />
      <LogInfoItem boardSize={boardSize} category='clothing' width={width / 6} />
      <LogInfoItem boardSize={boardSize} category='mobility' width={width / 6} />
      <LogInfoItem boardSize={boardSize} category='media' width={width / 6} />
    </>
  )

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      <div {...css({ width: w * 1, background: theme.score, padding })}>
        <div
          {...css({ display: 'flex', justifyContent: 'space-between' })}
        >
          <div
            {...css({
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
            })}
          >
            <div {...css({ ...fonts(boardSize).tiny, color: '#fff' })}>
              Monat
            </div>
            <div {...css({ ...fonts(boardSize).large, color: '#fff' })}>
              {gameState.round}/6
            </div>
          </div>
          <div
            {...css({
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
              position: 'relative',
            })}
          >
            <div
              {...css({
                ...fonts(boardSize).tiny,
                position: 'absolute',
                padding: '4%',
                background: theme.help,
                color: '#fff',
                top: '130%',
                width: '100%',
                left: '-50%',
                opacity: started ? 0 : 1,
                transform: 'opacity 0.3s ease-in-out',
              })}
            >
              So viel Monat ist übrig.
            </div>
            <div {...css({ ...fonts(boardSize).tiny, color: '#fff' })}>
              Datum
            </div>
            <div {...css({ ...fonts(boardSize).large, color: '#fff' })}>
              {(field.id * 2 - 1) % 32}. {MONTHS[gameState.round - 1]}
            </div>
          </div>
          <div
            {...css({
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
              position: 'relative',
            })}
          >
            <div
              {...css({
                ...fonts(boardSize).tiny,
                position: 'absolute',
                padding: '4%',
                background: theme.help,
                color: '#fff',
                top: '130%',
                width: '100%',
                left: '-5%',
                opacity: started ? 0 : 1,
                transform: 'opacity 0.3s ease-in-out',
              })}
            >
              So viel Geld ist übrig.
            </div>
            <div {...css({ ...fonts(boardSize).tiny, color: '#fff' })}>
              Kontostand
            </div>
            <div {...css({ ...fonts(boardSize).large, color: '#fff' })}>
              {formatAmount(gameState.balance)}
            </div>
          </div>
        </div>
      </div>
      <div
        {...css({
          position: 'absolute',
          bottom: 0,
          width: (2 * width) / 7,
          overflowX: 'visible',
          paddingBottom: 0,
        })}
      >
        {!started && (
          <div
            {...css({
              ...fonts(boardSize).tiny,
              padding: 10,
              background: theme.help,
              color: '#fff',
              marginBottom: '3%',
            })}
          >
            Dafür geben Sie das Geld aus.
          </div>
        )}
        <div
          {...css({
            display: 'flex',
            whiteSpace: 'nowrap',
            width: (96 * width) / 7,
          })}
        >
          {started ? reverse(transactionLog) : <LogInfo />}
        </div>
      </div>
    </div>
  )
}

Score.defaultProps = {
  avatar: AVATARS[0],
}

export default Score
