import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts, formatAmount } from './Text'
import icons from './icons';

const Dialog = ({field = {}, width, height, advanceGame, boardSize, show}) => {

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
    pointerEvents: show ? undefined : 'none',
    margin: 'auto',
  })
  const base = css({
    border: `${border}px solid rgba(255,255,255,0.6)`,
    position: 'absolute',
    minHeight: height/2,
    padding: 15,
    paddingBottom: 50,
    background: theme.field,
    bottom: show && expand ? -border : -height,
    width,
    transition: 'bottom 0.3s ease-in-out',
    boxSizing: 'border-box',
    background: icon ? icon.color : '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  })

  const text = css({
    ...fonts(boardSize).regular
  })
  const action = css({
    ...fonts(boardSize).bold,
    cursor: 'pointer',
    width: '50%',
    padding: '0 3%',
    marginTop: 0,
    textAlign: 'center',
  })
  const price = css({
    ...fonts(boardSize).large,
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
          { formatAmount(Math.abs(amount)) }
        </div>
        <div style={{display: 'flex'}}>
          <p {...action} onClick={() => collapse(field, false)}>{yes}</p>
          <p {...action} onClick={() => collapse(field, true) }>{no}</p>
        </div>
      </div>
    </div>
  )

}

export default Dialog
