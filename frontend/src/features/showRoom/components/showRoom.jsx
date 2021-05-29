import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import utils from 'root/utils';
import { SHOW_ROOM_REDUCER } from 'root/actions/types';
import { getNovals } from './../actions'

const ShowRoom = (props) => {
  return (
    <>test</>
  )
}

const mapState = (state) => ( { ...utils.get(state, SHOW_ROOM_REDUCER) })

const mapProps = {
  getNovals,
}

export default connect(mapState, mapProps)(ShowRoom)