import React from 'react'
import { CircularProgress } from '@material-ui/core'

const LoadingComponent = () => {
  return (<div style={{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  }}>
    <CircularProgress />
  </div>)
}

export default LoadingComponent