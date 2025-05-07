import React, { useEffect } from 'react'
import './Error.css'

function Error({ errorTitle, errorMessage , setErrorTitle , setErrorMessage}) {
    useEffect(() => {
        if (!navigator.onLine) {
            setErrorTitle('Network Error!')
            setErrorMessage('Please check your internet connection')
        } 
    }, [setErrorMessage, setErrorTitle])
    return (
        <div className='error-div'>
            <div className='error-holder'>
                <h1 className='error-title'>{errorTitle || "Something went wrong!"}</h1>
                <p>{errorMessage || "We working on this issue, please try again..."}</p>
            </div>
        </div>
    )
}

export default Error
