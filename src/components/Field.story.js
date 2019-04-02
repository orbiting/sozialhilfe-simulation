import React from 'react'
import { storiesOf } from '@storybook/react'
import Field from './Field'

import fields from '../../fields.json'

storiesOf('Field', module)
  .add('default', () => (
    <div style={{width: 200, height: 400}}>
      <Field field={fields.data[5]} />
    </div>
  ))
  .add('left', () => (
    <div style={{width: 400, height: 200}}>
      <Field field={fields.data[5]} orientation='left' />
    </div>
  ))
  .add('right', () => (
    <div style={{width: 400, height: 200}}>
      <Field field={fields.data[5]} orientation='right' />
    </div>
  ))
