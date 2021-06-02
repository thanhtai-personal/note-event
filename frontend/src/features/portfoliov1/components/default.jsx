import React from 'react'
import { connect } from 'react-redux'
import { FEATURE_PORTFOLIO_V1 } from 'root/actions/types'
import utils from 'root/utils'
import { defaultAction } from './../actions'
import Portfolio from './portfolio'


const HomeComponent = (props) => {
  return (
    <Portfolio {...props} />
  )
}

const mapState = (state) => {
  return ({ ...utils.get(state, FEATURE_PORTFOLIO_V1) })
}

const mapDispatch = {
  defaultAction,
}

export default connect(mapState, mapDispatch)(HomeComponent)