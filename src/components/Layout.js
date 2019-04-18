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

  const [ size, setSize ] = useState(null)
  const centerRef = useRef(null)

  const measure = () => {
    if (centerRef.current) {
      const { width, height } = centerRef.current.getBoundingClientRect()
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      setSize({ width, height, innerWidth, innerHeight })
    }
  }
  useEffect(
    () => { measure() }, []
  )
  useEffect(
    () => {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
  )

  return (
    <>
      <Center>
        <div ref={centerRef} style={{background: theme.background, padding: 10}}>
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
        </div>
      </Center>
      {
        size &&
        <div style={{background: theme.background, width: size.innerWidth, height: 800, display: 'flex'}}>
          {/*<div style={{background: 'coral', width: size.width + (size.innerWidth - size.width)/2, height: 800}} />*/}
          {/*<div style={{background: '#991214', width: (size.innerWidth - size.width)/2, height: 200}} />*/}
          <App centerWidth={size.width} marginWidth={(size.innerWidth - size.width)/2} height={Math.min(1000, size.innerHeight)} />
        </div>
      }
    </>
  )
}

export default Layout
