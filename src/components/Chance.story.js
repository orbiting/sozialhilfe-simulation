import React from 'react'
import { storiesOf } from '@storybook/react'
import Chance from './Chance'

import fields from '../../fields.json'

storiesOf('Chance', module)
  .add('default', () => (
    <svg width={1000} height={1000}>
      <Chance field={fields.data[5]} />
    </svg>
  ))