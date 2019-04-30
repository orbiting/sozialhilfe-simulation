import React from 'react';
import { storiesOf } from '@storybook/react';
import Lane from './Lane'

import fields from '../../fields.json'
import { getInitialState } from './App'
import AVATARS from './avatars';

storiesOf('Lane', module)
  .add('default',
    () => <svg width={1000} height={1000}><Lane gameState={getInitialState()} fields={fields.data.slice(0,4)} /></svg>
  )
  .add('start',
    () => <svg width={1000} height={1000}><Lane gameState={getInitialState()} fields={fields.data.slice(0,4)} avatar={AVATARS[0]} start /></svg>
  )
  .add('translate',
    () => <svg width={1000} height={1000}><Lane gameState={getInitialState()} fields={fields.data.slice(0,4)} rotate={-90} y={600} /></svg>
  )