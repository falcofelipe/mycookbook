import React, { Fragment } from 'react'
import spinner from './spinner.gif'; // We can import images because of WebPack.

const Spinner = () => {
  return (  // We don't actually need this return() with arrow functions, but I believe it's more organized to have it.
    <Fragment>
      <img src={spinner} alt="Loading..." style={{ width:'200px', margin: 'auto', display: 'block' }}/>
    </Fragment>
  )
}

export default Spinner