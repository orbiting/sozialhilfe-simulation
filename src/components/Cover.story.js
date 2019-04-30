import React from 'react'
import { storiesOf } from '@storybook/react'
import Cover from './Cover'


storiesOf('Cover', module)
  .add('default', () => (
    <Cover />
  ))
.add('article', () => (
    <Cover rows={4} cols={8} loop={3} fill margin={30} />
  ))
.add('front', () => (
  <Cover cols={4} rows={4} margin={5} size={200} fill loop='indefinite' />
))
.add('social', () => (
  <Cover cols={4} size={200} margin={40} rows={4} fill loop={1} />
))
