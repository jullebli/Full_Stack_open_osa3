import React from 'react'

const Notification = ({ message, isError }) => {

  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: 'solid',
    fontSize: '20px',
    borderRadius: '5px',
    padding: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    fontSize: '20px',
    borderRadius: '5px',
    padding: '10px'
  }

  return (
    <div style={isError ? errorStyle : messageStyle}>
      {message}
    </div>
  )
}

export default Notification
