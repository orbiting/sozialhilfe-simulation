import React, { useState } from 'react'
import theme from './theme'
import Text, { fonts, formatAmount } from './Text'
import { Chart } from '@project-r/styleguide/chart'
import range from 'lodash/range'
import reverse from 'lodash/reverse'
import sortBy from 'lodash/sortBy'

import { scaleLinear } from 'd3-scale'
import { stack, line, curveStepAfter } from 'd3-shape'
import { sum } from 'd3-array'

import { schemeSet2 } from 'd3-scale-chromatic'

import { css } from 'glamor'
import icons, { Avatar, Wallet, Calendar } from './icons'
import AVATARS from './avatars'

const MONTHS = ['Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt']

const LegendSymbol = ({ color = '#999', size }) => (
  <div
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      background: color,
      border: '1px solid #fff',
    }}
  />
)

const Score = ({
  gameState,
  field = {},
  width,
  height,
  boardSize,
  started,
}) => {
  const {
    balance,
  } = gameState.score

  const padding = boardSize / 120
  const w = width - 2 * padding

  const transactionLog = gameState.transactions.completed.map(
    (t, i, arr) => {
      const icon = icons[t.field.category] || icons.general
      const generalIcon = icons.general
      return (
        <span style={{ background: theme.score }}>
          {!t.reject && (
            <div
              key={`p${t.field.id}`}
              style={{
                ...fonts(boardSize).tiny,
                display: 'inline-block',
                width: width / 7,
                padding: 5,
                background:
                  theme.categories[t.field.category] ||
                  theme.placeholderDark,
                color: '#fff',
              }}
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
            style={{
              ...fonts(boardSize).tiny,
              display: 'inline-block',
              width: width / 7,
              padding: 5,
              background: theme.categories['general'],
              color: '#fff',
            }}
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

  const logInfo = (
    <>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['general'],
          color: '#fff',
        }}
      >
        <icons.general.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Alltag
      </div>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['life'],
          color: '#fff',
        }}
      >
        <icons.life.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Leben
      </div>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['leisure'],
          color: '#fff',
        }}
      >
        <icons.leisure.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Freizeit
      </div>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['clothing'],
          color: '#fff',
        }}
      >
        <icons.clothing.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Kleider
      </div>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['mobility'],
          color: '#fff',
        }}
      >
        <icons.mobility.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Mobilität
      </div>
      <div
        style={{
          ...fonts(boardSize).tiny,
          boxSizing: 'border-box',
          padding: 5,
          width: width / 6,
          background: theme.categories['media'],
          color: '#fff',
        }}
      >
        <icons.media.Icon fill={'#fff'} width={20} height={20} />
        <br />
        Medien
      </div>
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
      <div style={{ width: w * 1, background: theme.score, padding }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div
            style={{
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
            }}
          >
            <div style={{ ...fonts(boardSize).tiny, color: '#fff' }}>
              Monat
            </div>
            <div style={{ ...fonts(boardSize).large, color: '#fff' }}>
              {gameState.round}/6
            </div>
          </div>
          <div
            style={{
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
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
              }}
            >
              So viel Monat ist übrig.
            </div>
            <div style={{ ...fonts(boardSize).tiny, color: '#fff' }}>
              Datum
            </div>
            <div style={{ ...fonts(boardSize).large, color: '#fff' }}>
              {(field.id * 2 - 1) % 32}. {MONTHS[gameState.round - 1]}
            </div>
          </div>
          <div
            style={{
              display: 'block',
              width: '33.3%',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
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
              }}
            >
              So viel Geld ist übrig.
            </div>
            <div style={{ ...fonts(boardSize).tiny, color: '#fff' }}>
              Kontostand
            </div>
            <div style={{ ...fonts(boardSize).large, color: '#fff' }}>
              {formatAmount(balance)}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: (2 * width) / 7,
          overflowX: 'visible',
          paddingBottom: 0,
        }}
      >
        {!started && (
          <div
            style={{
              ...fonts(boardSize).tiny,
              padding: 10,
              background: theme.help,
              color: '#fff',
              marginBottom: '3%',
            }}
          >
            Dafür geben Sie das Geld aus.
          </div>
        )}
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            width: (96 * width) / 7,
          }}
        >
          {started ? reverse(transactionLog) : logInfo}
        </div>
      </div>
    </div>
  )
}

Score.defaultProps = {
  avatar: AVATARS[0],
}

export default Score
