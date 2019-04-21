import React from 'react'
import { storiesOf } from '@storybook/react'
import Board from './Board'

import fields from '../../fields.json'
import { GAME_INITIAL_STATE } from './App'

storiesOf('Board', module)
  .add('default', () => (
    <svg width={700} height={700}>
      <Board fields={fields.data} gameState={GAME_INITIAL_STATE} />
    </svg>
  ))
  .add('large', () => (
    <svg width={1200} height={1200}>
      <Board fields={fields.data} boardSize={1200} gameState={GAME_INITIAL_STATE} />
    </svg>
  ))
  .add('empty', () => (
    <svg width={700} height={700}>
      <Board  gameState={GAME_INITIAL_STATE} />
    </svg>
  ))
