import React from 'react'
import { storiesOf } from '@storybook/react'
import Board from './Board'

import fields from '../../fields.json'
import { getInitialState } from './App'
import AVATARS from './avatars';

storiesOf('Board', module)
  .add('default', () => (
    <svg width={510} height={510} xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(5,5)'>
        <Board fields={fields} gameState={getInitialState()} avatar={AVATARS[0]} />
      </g>
    </svg>
  ))
  .add('blink', () => (
    <svg width={510} height={510} xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(5,5)' fill={'#fff'}>
        <Board boardSize={500} fields={fields} gameState={getInitialState()} avatar={AVATARS[0]} blink />
      </g>
    </svg>
  ))
  .add('large', () => (
    <svg width={1200} height={1200} xmlns='http://www.w3.org/2000/svg'>
      <Board fields={fields} boardSize={1200} gameState={getInitialState()} />
    </svg>
  ))
  .add('empty', () => (
    <svg width={700} height={700} xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(5,5)'>
        <Board fields={fields.slice(16, 32)} />
      </g>
    </svg>
  ))
