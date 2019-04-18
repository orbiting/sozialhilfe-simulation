import React from 'react';
import { storiesOf } from '@storybook/react';
import Lane from './Lane'

import fields from '../../fields.json'
import { GAME_INITIAL_STATE } from './App'

storiesOf('Lane', module)
  .add('default',
    () => <svg width={1000} height={1000}><Lane gameState={GAME_INITIAL_STATE} fields={fields.data.slice(0,4)} /></svg>
  )
  .add('translate',
    () => <svg width={1000} height={1000}><Lane gameState={GAME_INITIAL_STATE} fields={fields.data.slice(0,4)} rotate={-90} y={600} /></svg>
  )