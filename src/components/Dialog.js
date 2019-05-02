import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';
import { Button } from '@project-r/styleguide';

const Dialog = ({field = {}, width, height, advanceGame, boardSize, show, mobile}) => {

  const {description, yes, no, id, amount, category} = field

  const [ expand, setExpand ] = React.useState(false)

  const icon = icons[category]
  const border = boardSize/200

  React.useEffect(
    () => {
      setExpand(true)
    },
    [show]
  )

  const collapse = (field, reject) => {
    setExpand(false)
    setTimeout(() => advanceGame(field, reject), 300)
  }

  const wrapper = css({
    position: 'absolute',
    width,
    height,
    overflow: 'hidden',
    pointerEvents: show ? 'all' : 'none',
    margin: 'auto',
  })

  const baseWidth = width*(mobile ? 1 : 0.7)

  const base = css({
    border: `${border}px solid rgba(255,255,255,0.6)`,
    position: 'absolute',
    minHeight: height/2,
    padding: 15,
    left: width*(mobile ? 0 : 0.15),
    background: theme.field,
    bottom: show && expand ? height*0.125 : -height,
    width: baseWidth,
    transition: 'bottom 0.3s ease-in-out',
    boxSizing: 'border-box',
    background: icon ? icon.color : '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    userSelect: 'none',
  })

  const text = css({
    ...fonts(boardSize).regular
  })
  const action = {
    ...fonts(boardSize).regular,
    cursor: 'pointer',
    minWidth: baseWidth*0.41,
    width: baseWidth*0.41,
    padding: '10px 5px',
    height: 'auto',
  }
  const price = css({
    ...fonts(boardSize).xlarge,
    textAlign: 'center',
    margin: '8% 0',
    cursor: 'pointer',
  })


  return (
    <div {...wrapper}>
      <div {...base}>
        { icon &&
          <div style={{display: 'flex', margin: '1% 0', justifyContent: 'center', paddingBottom: width/30}}>
            <icon.Icon width={width/8} height={width/8} fillOpacity={0.6} fill={'#fff'} />
          </div>
        }
        <div {...text}>
          { description }
        </div>
        <div {...price}>
          { formatAmount(amount) }
        </div>
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
          <Button white style={action} onClick={() => collapse(field, false)}>{yes}</Button>
          <Button white style={action} onClick={() => collapse(field, true) }>{no}</Button>
        </div>
      </div>
    </div>
  )

}

export default Dialog
