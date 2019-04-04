import React from 'react'
import { storiesOf } from '@storybook/react'
import Board from './Board'

import fields from '../../fields.json'

storiesOf('Board', module)
  .add('default', () => (
    <svg width={700} height={700}>
      <Board fields={fields.data} />
    </svg>
  ))
  .add('large', () => (
    <svg width={1200} height={1200}>
      <Board fields={fields.data} boardSize={1200} />
    </svg>
  ))
