import React from 'react'
import GridImage from './gridImage'

import setupFeature from '../setup'
setupFeature()


const GridImageComponent = (props) => {
  return (
    <GridImage {...props} />
  )
}

export default GridImageComponent