import React from 'react'
import { storiesOf } from '@storybook/react'
import Board from './Board'

import fields from '../../fields.json'
import { GAME_INITIAL_STATE } from './App'

storiesOf('Board', module)
  .add('default', () => (
    <svg width={700} height={700} xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(5,5)'>
        <Board fields={fields.data} gameState={GAME_INITIAL_STATE} />
      </g>
    </svg>
  ))
  .add('large', () => (
    <svg width={1200} height={1200} xmlns='http://www.w3.org/2000/svg'>
      <Board fields={fields.data} boardSize={1200} gameState={GAME_INITIAL_STATE} />
    </svg>
  ))
  .add('empty', () => (
    <svg width={700} height={700} xmlns='http://www.w3.org/2000/svg'>
      <Board  gameState={GAME_INITIAL_STATE} />
    </svg>
  ))
