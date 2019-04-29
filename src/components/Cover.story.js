import React from 'react'
import { storiesOf } from '@storybook/react'
import Cover from './Cover'


storiesOf('Cover', module)
  .add('default', () => (
    <Cover />
  ))
  .add('square', () => (
    <Cover cols={4} loop='indefinite' />
  ))
