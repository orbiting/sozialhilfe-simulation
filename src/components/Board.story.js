import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Board from './Board'

import fields from '../../fields.json'

storiesOf('Board', module)
  .add('default', () => (
    <Board fields={fields.data} />
  ))
