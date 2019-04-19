import React from 'react'
import { css } from 'glamor'
import theme from './theme'
import { fonts } from './Text'

const Dialog = ({field, width, height, advanceGame, boardSize, show}) => {

  const {description, yes, no, id, amount} = field

  const [ expand, setExpand ] = React.useState(false)

  React.useEffect(
    () => {
      const delay = setTimeout(() => setExpand(true), 300)
      return () => clearTimeout(delay)
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
  })
  const base = css({
    position: 'absolute',
    padding: 15,
    background: theme.field,
    bottom: show && expand ? 0 : -height,
    width,
    height: height/2,
    transition: 'bottom 0.3s ease-in-out',
    boxSizing: 'border-box',
  })

  const text = css({
    ...fonts(boardSize).regular
  })
  const action = css({
    ...fonts(boardSize).bold,
    cursor: 'pointer',
  })
  const price = css({
    ...fonts(boardSize).huge,
    textAlign: 'center',
    marginTop: 5,
    cursor: 'pointer',
  })

  return (
    <div {...wrapper}>
      <div {...base}>
        <div {...text}>
          { description }
        </div>
        <div {...price}>
          sFr. { -amount }
        </div>
        <p {...action} onClick={() => collapse(field, false)}>{yes}</p>
        <p {...action} onClick={() => collapse(field, true) }>{no}</p>
      </div>
    </div>
  )

}

export default Dialog
