import React from 'react'
import { fontFamilies } from '@project-r/styleguide'

import { css } from 'glamor'

const styles = {
  wrapper: css({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#eee',
    display: 'flex'
  }),
  header: css({
    background: '#999',
    flex: '1'
  }),
  bottom: css({
    flexDirection: 'column',
  }),
  left: css({
    flexDirection: 'row-reverse',
  }),
  top: css({
    flexDirection: 'column-reverse',
  }),
  right: css({
    flexDirection: 'row',
  }),
  body: css({
    flex: '9',
    fontFamily: fontFamilies.sansSerifMedium,
    fontSize: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  })
}

const Field = ({field: { description, price }, orientation = 'top'}) => {

  return (
    <div {...styles.wrapper} {...styles[orientation]}>
      <div {...styles.header} />
      <div {...styles.body}>
        <div>{description}</div>
        <div>{price}</div>
      </div>
    </div>
  )

}

Field.defaultProps = {
  width: 200,
  height: 100,
}

export default Field