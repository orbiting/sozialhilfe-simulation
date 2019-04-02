import React, { Component } from 'react'



const App = () =>
  <div 
  	style={{width: 200, height: 200, background: 'black'}} onTouchStart={e =>  console.log('Board.js:8 [e]', e)} onWheel={e =>  console.log('Board.js:8 [e]', e.deltaY)} >

  </div>


export default App
