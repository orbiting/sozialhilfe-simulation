import React from 'react'
import { storiesOf } from '@storybook/react'
import Layout from './Layout'
import { css } from 'glamor';

css.global('html, body',  { padding: 0, margin: 0 })

storiesOf('Layout', module)
  .add('default', () => (
    <Layout />
  ))
