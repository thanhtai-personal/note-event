import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography, Table, TableBody, TableRow, TableCell, useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  profileSection: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: 'beige'
  },
  imageProfile: {
    width: '250px',
    height: '300px',
    borderRadius: '45%',
    boxShadow: '2px 4px yellow'
  },
  profileInformation: {
    marginTop: theme.spacing(4)
  },
  sortDescription: {
    backgroundColor: 'gray',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  firstcharacter: {
    color: '#2c3d4f',
    float: 'left',
    fontFamily: 'Georgia',
    fontSize: '3em',
    lineHeight: '1em',
    paddingTop: '0px',
    paddingRight: '8px',
    paddingLeft: '3px',
  },
  profileItem: {
    '&:hover': {
      backgroundColor: 'white'
    }
  }
}))

export default function Profile(props) {
  const classes = useStyles()
  const { profileData } = props
  const minWidth1100 = useMediaQuery('(min-width: 1100px)')
  const profileDataElements = useMemo(() => profileData.informations.map((info, index) => (
    <TableRow key={`${info.key}-${index}`} className={classes.profileItem}>
      <TableCell>
        {info.name}
      </TableCell>
      <TableCell>
        {info.type === 'link' ? <a rel='noreferrer' target='_blank' href={info.value}>{info.value}</a> : info.value}
      </TableCell>
    </TableRow>))
    , [profileData, classes])

  return (
    <Paper className={classes.profileSection}>
      <Grid container>
        <Grid item xs={4} style={minWidth1100 ? {} : { display: 'none' }}>
          <Typography align={'center'}>
            {<picture>
              <img className={classes.imageProfile} src={profileData.image} alt={profileData.imageText} />
            </picture>}
          </Typography>
        </Grid>
        <Grid item xs={minWidth1100 ? 8 : 12}>
          <Typography className={classes.sortDescription} >
            <span className={classes.firstcharacter}>I</span> {profileData.sortDescription}
          </Typography>
          <Table className={classes.profileInformation}>
            <TableBody>
              {profileDataElements}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  )
}

Profile.propTypes = {
  post: PropTypes.object,
}