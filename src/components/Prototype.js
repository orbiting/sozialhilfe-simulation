import React from 'react'
import { format } from 'd3-format'
import { css } from 'glamor'
var f = format(".2f");

import fields from '../../fields.json'

const styles = {
  header: css({
    background: '#eee',
    padding: 10,
    marginBottom: 10,
  }),
  actionBar: css({
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
  })
}

const FIELDS_PER_ROUND = 4
const MONTHLY_ALLOWANCE = 986
const FLAT_MONTHLY_EXPENSES = 352

const Prototype = () => {

  const [currentRound, setCurrentRound] = React.useState(1)
  const [currentField, setCurrentField] = React.useState(1)
  const [balance, setBalance] = React.useState(MONTHLY_ALLOWANCE)

  const currentFieldDef = fields.data[currentField]
  const flatExpense = FLAT_MONTHLY_EXPENSES/fields.data.length

  const advance = () => {
    setCurrentField(currentField+1);
    setBalance(balance-currentFieldDef.price-flatExpense)
    if (currentField > 0 && currentField % FIELDS_PER_ROUND === 0) {
      setCurrentRound(currentRound+1)
      setBalance(balance+MONTHLY_ALLOWANCE)
    }
  }

  const reset = () => {
    setCurrentRound(1)
    setCurrentField(1)
    setBalance(MONTHLY_ALLOWANCE)
  }

  return (
    <div style={{width: 400, margin: 'auto'}}>
      <div {...styles.header}>
        Runde: {currentRound}/12, Feld: {currentField}/{FIELDS_PER_ROUND}, Fixkosten: {f(flatExpense)}/Feld
      </div>
      <div>Balance: {f(balance)}</div>
      <hr />
      <div>{currentFieldDef.description}</div>
      <div>{f(currentFieldDef.price)}</div>
      <div {...styles.actionBar}>
        <button onClick={reset}>Reset</button>
        <button onClick={advance}>Next</button>
      </div>
    </div>
  )

}

export default Prototype