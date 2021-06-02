import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, useMediaQuery } from '@material-ui/core'
import bannerImage from 'root/assert/images/mini-profile-bg-01.jpg'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '53em',
    width: '100%',
    marginRight: 0,
    marginLeft: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginTop: 0,
    paddingTop: 0,
    top: '-10px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    }
  },
  title: {
    opacity: 0.4,
    color: 'orange',
    fontFamily: 'Texturina',
    marginRight: '30px',
    marginTop: '6em',
    float: 'right',
    right: 0
  },
  subTitle: {
    opacity: 0.4,
    color: 'orange',
    fontFamily: 'Texturina',
    marginRight: '40px',
    float: 'right',
    right: 0
  },
  description: {
    color: 'white',
    fontFamily: 'Amatic SC',
    marginRight: '20px',
    marginBottom: '1em',
    marginTop: '11em',
    float: 'right'
  }
}))

export default function Banner(props) {
  const classes = useStyles()
  const minWidth600 = useMediaQuery('(min-width: 600px)')
  const { post = {} } = props

  return (
    <Paper className={classes.mainFeaturedPost}>
      <div className={classes.overlay} />
      <div className={classes.mainFeaturedPostContent}>
        <Grid container className={classes.bannerContent}>
          <Grid item md={12}>
            <Typography className={classes.title} variant='h2' color='inherit' gutterBottom>
              {post.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <Typography className={classes.subTitle} variant='h5' color='inherit' paragraph>
              {post.subTitle}
            </Typography></Grid>
        </Grid>
        <Grid container style={minWidth600 ? {} : { display: 'none' }}>
          <Grid item md={12}>
            <Typography className={classes.description} variant='h5' color='inherit' paragraph>
              {post.description}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

Banner.propTypes = {
  post: PropTypes.object,
}