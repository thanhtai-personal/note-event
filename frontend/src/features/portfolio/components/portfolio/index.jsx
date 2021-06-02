import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { portfolioActions } from '../../actions'
import Color from 'root/utils/color'
import Home from './home'
import Watch from './watch'
import Gallery from './gallery'
import './resetCss.css'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, useMediaQuery } from '@material-ui/core'
import cssVariable from 'root/utils/cssVariable'
import PianoComponent from './piano'
import utils from 'root/utils'
import { FEATURE_PORTFOLIO } from 'root/actions/types'
const SoundComponent = React.lazy(() => import('root/commonComponents/soundFactory/component'))
// const SingleSoundComponent = React.lazy(() => import('root/commonComponents/soundFactory/singleSound'))

const useStyles = (props) => (makeStyles((theme) => ({
  pageContent: {
    minWidth: '90vw',
    maxWidth: '100vw',
    minHeight: '100vh',
    margin: 0,
    paddingLeft: cssVariable.leftBarWidth,
    backgroundColor: Color.black2,
    
  },
  soundInfo: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    float: 'right',
    color: Color.white
  },
  pianoWrap: {
    position: 'absolute',
    bottom: 0,
    left: props.maxWidth1240 ? '70px' : 'calc(50vw - 22em)',
    float: 'left',
    color: Color.white,
    opacity: '0.3',
    pointerEvents: 'none',
  },
  watchWrap: {
    display: props.maxWidth1240 ? 'inherit' : 'none'
  }
})))

const PortfolioComponent = (props) => {
  const { activeMenu } = props
  const maxWidth1240 = useMediaQuery('(min-width: 1240px)')
  const classes = useStyles({ maxWidth1240 })()

  return (
    <div className={classes.pageContent}>
      {activeMenu !== 'gallery' && <Home activeMenu={activeMenu} />}
      {activeMenu === 'gallery' && <Suspense fallback={<div></div>}>
        <Gallery />
      </Suspense>}
      {activeMenu !== 'gallery' && <div className={classes.watchWrap}> <Watch /> </div>}
      <Suspense fallback={<Typography className={classes.soundInfo}>SOUND: Loading...</Typography>}>
        <SoundComponent />
      </Suspense>
      {/* <Suspense fallback={<Typography className={classes.soundInfo}>MUSIC: Loading...</Typography>}>
        <SingleSoundComponent />
      </Suspense> */}
      {activeMenu !== 'gallery'
        && <div className={classes.pianoWrap}>
          <PianoComponent />
        </div>}
    </div>
  )
}

const mapState = (state) => (utils.get(state, `${FEATURE_PORTFOLIO}`))

const mapDispatch = {
  portfolioActions,
}

export default connect(mapState, mapDispatch)(PortfolioComponent)