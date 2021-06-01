import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import utils from 'root/utils';
import { SHOW_ROOM_REDUCER } from 'root/actions/types';
import { getNovals } from '../../actions'
import 'ui-neumorphism/dist/index.css'
import { Grid } from '@material-ui/core'
import { overrideThemeVariables } from 'ui-neumorphism'
import SearchInput from './searchInput'
import MediaCard from './mediaCard'

const ShowRoom = (props) => {

  const { getNovals, novals = [{ test: 'test' }] } = props

  useEffect(() => {
    getNovals({ popular: true, limit: 24 })
  }, [getNovals])

  useEffect(() => {
    overrideThemeVariables({
      '--light-bg': '#b9d7d2',
      '--light-bg-dark-shadow': '#c8e7e3',
      '--light-bg-light-shadow': '#a0bab6'
    })
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <SearchInput getNovals={getNovals} />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <Grid container spacing={2}>
          {novals.map((noval, index) => (<Grid key={`noval-${noval.id}-${noval.name}-${index}`} item xs={2}>
            <MediaCard data={noval} />
          </Grid>))
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapState = (state) => ({ ...utils.get(state, SHOW_ROOM_REDUCER) })

const mapProps = {
  getNovals,
}

export default connect(mapState, mapProps)(ShowRoom)