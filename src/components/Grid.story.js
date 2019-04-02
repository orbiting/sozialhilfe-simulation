import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from './Grid'

import fields from '../../fields.json'

storiesOf('Grid', module)
  .add('default', () => (
    <Grid />
  ))
  .add('with fields', () => (
    <Grid fields={fields.data} />
  ))
