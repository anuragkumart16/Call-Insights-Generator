import React, { useEffect } from 'react'
import './Splash.css'
import { PacmanLoader } from 'react-spinners'
import healthCheck from '../../../utils/healthcheck'

function SplashScreen({ setter, errorSetter, errorTitle, errorMessage }) {
  useEffect(() => {
    healthCheck()
      .then((data) => {
        if (data.success) {
          setter(false)
        }
      })
      .catch(() => {
        errorSetter(true)
        errorTitle('Server Error!')
        errorMessage('We are working on this issue, please try again...')
      })
  }, [setter, errorSetter, errorTitle, errorMessage])
  return (
    <div className='splash-div'>
      <h1 className='heading'>Call Insight Generator</h1>
      <p>Starting server, it might take a minute</p>
      <PacmanLoader color='#E3E3E3' />
    </div>
  )
}

export default SplashScreen
