import React from 'react'
import Portfolio from './portfolio'

import setupFeature from '../setup'
setupFeature()


const PortfolioComponent = (props) => {
  return (
    <Portfolio {...props} />
  )
}

export default PortfolioComponent