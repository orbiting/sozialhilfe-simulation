import React, { useEffect, useRef, useState } from 'react'
import { Container, NarrowContainer, Center, Editorial, Interaction, Button } from '@project-r/styleguide'

import theme from './theme'
import { css } from 'glamor'
import App from './App'



const Layout = () => {

  const center = css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

  const [ playing, setPlaying ] = useState(false)

  return (
    <>
      <div style={{background: theme.background, height: '100%', padding: 10}}>
        <Interaction.P>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum
          sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium.Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputateeleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,enim. Aliquam lorem
          ante, dapibus in, viverra quis, feugiat a, tellus. Phasellusviverra nulla ut metus varius laoreet. Quisque
          rutrum. Aenean imperdiet. Etiamultricies nisi vel augue.
        </Interaction.P>
        <Interaction.P>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum
          sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium.Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputateeleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,enim. Aliquam lorem
          ante, dapibus in, viverra quis, feugiat a, tellus. Phasellusviverra nulla ut metus varius laoreet. Quisque
          rutrum. Aenean imperdiet. Etiamultricies nisi vel augue.
        </Interaction.P>
        <Interaction.P>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligulaeget dolor. Aenean massa. Cum
          sociis natoque penatibus et magnis dis parturientmontes, nascetur ridiculus mus. Donec quam felis, ultricies
          nec, pellentesqueeu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,imperdiet a, venenatis vitae, justo. Nullam
          dictum felis eu pede mollis pretium.Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputateeleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac,enim. Aliquam lorem
          ante, dapibus in, viverra quis, feugiat a, tellus. Phasellusviverra nulla ut metus varius laoreet. Quisque
          rutrum. Aenean imperdiet. Etiamultricies nisi vel augue.
        </Interaction.P>
        <Button onClick={() => setPlaying(true)}>Start</Button>
      </div>
      {
        playing &&
        <div style={{position: 'fixed', top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, overflow: 'hidden'}} onClick={() => setPlaying(false)}>
          <App fullscreen />
        </div>
      }
    </>
  )
}

export default Layout
