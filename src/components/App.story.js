import React from 'react'
import { storiesOf } from '@storybook/react'
import App from './App'
import AVATARS from './avatars';


storiesOf('App', module)
  .add('default', () => (
    <App avatar={AVATARS[0]} showInfo={false} />
  ))
  .add('showInfo', () => (
    <App avatar={AVATARS[0]} showInfo={true} />
  ))
  .add('iPhone 6', () => (
    <App centerWidth={375-15} marginWidth={15} height={667} avatar={AVATARS[0]} />
  ))
