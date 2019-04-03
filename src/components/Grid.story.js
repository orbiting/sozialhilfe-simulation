import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from './Grid'

import fields from '../../fields.json'

storiesOf('Grid', module)
  .add('default', () => (
    <svg width={300} height={300}>
      <Grid fields={fields.data} size={300} />
    </svg>
  ))
  .add('large', () => (
    <svg width={1200} height={1200}>
      <Grid fields={fields.data} size={1200} />
    </svg>
  ))
