import React from 'react';
import { storiesOf } from '@storybook/react';
import Lane from './Lane'

import fields from '../../fields.json'

storiesOf('Lane', module)
  .add('default',
    () => <svg width={1000} height={1000}><Lane fields={fields.data.slice(0,4)} /></svg>
  )
  .add('translate',
    () => <svg width={1000} height={1000}><Lane fields={fields.data.slice(0,4)} rotate={-90} y={500} /></svg>
  )