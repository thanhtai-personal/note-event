import React, { useMemo } from 'react'
import { Typography, makeStyles, Grid } from '@material-ui/core'

const useStyle = makeStyles((theme) => {
  return {
    skills: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      zIndex: 99
    },
    skill: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      '&:hover': {
        backgroundColor: 'beige'
      }
    },
    progressBar: {
      height: '5px',
      lineHeight: '5px',
      border: 'solid 1px black'
    },
    progress: {
      width: '90%',
      borderRadius: '0px',
      background: 'transparent'
    },
    contentPercent: {
      height: '100%',
      backgroundColor: 'red'
    },
    title: {
      borderBottom: 'solid 1px'
    }
  }
})

const Skills = (props) => {
  const classes = useStyle()
  const { skills } = props
  const skillElements = useMemo(() => skills?.map((skill, index) => (
    <Grid className={classes.skill} item xs={12} key={`${skill.name}-${index}`}>
      <Typography style={skill.isNote ? { color: 'red' } : {}}>{skill.name}: </Typography>
      <Typography className={classes.skillPercent}>{skill.percent}%</Typography>
      <div className={classes.progressBar}>
        <div className={classes.contentPercent} style={{ width: `${skill.percent}%` }}></div>
      </div>
    </Grid>))
    , [skills, classes])
  return (<div className={classes.skills}>
    <Typography className={classes.title} variant={'h5'} align={'center'} >{'Skills'}</Typography>
    {skillElements}
  </div>)
}

export default Skills