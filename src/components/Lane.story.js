import React from 'react';
import { storiesOf } from '@storybook/react';
import Lane from './Lane'

import fields from '../../fields.json'

storiesOf('Lane', module)
  .add('default',
    () => <svg width={500} height={500}><Lane fields={fields.data.slice(0,4)} /></svg>
  )