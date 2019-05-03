import React from 'react'
import { storiesOf } from '@storybook/react'
import Field from './Field'

import fields from '../../fields.json'

storiesOf('Field', module)
  .add('default', () => (
    <svg width={1000} height={1000}>
      <Field field={fields[5]} />
    </svg>

  ))
  .add('inactive', () => (
    <svg width={1000} height={1000}>
      <Field field={fields[5]} active={false} />
    </svg>

  ))
