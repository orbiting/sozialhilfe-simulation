import { useState } from 'react'

export const gameState = useState({
  amount: 986,
  budget: {
    leisure: 1/3,
    mobility: 1/3,
    media: 1/3,
  },
  month: 0,
  activeField: 0
})
