import React, { useState, useCallback } from 'react'
import { makeStyles, Paper, CircularProgress } from '@material-ui/core'
import { createTimelineItem } from '../timeline/util/util'
import { Spring, animated as a } from 'react-spring'
import TimeLine from '../timeline/lib/timeline'

const useStyle = makeStyles((theme) => ({
  experiencesPaper: {
    paddingTop: theme.spacing(2),
    backgroundColor: 'beige',
    marginTop: theme.spacing(5)
  },
}))

const Experiences = (props) => {
  const classes = useStyle()

  const result = window.matchMedia('(min-width: 800px)')
  const [isDesktop, setIsDesktop] = useState(result.matches)

  //function to decide where the element should be placed
  const isLeft = (item, index) => {
    return index % 2 === 0
  }

  //function to wrap the TimelineItem with another element if needed
  const wrapItem = (item, index) => {
    const isEven = index % 2 === 0
    const animationPropsLeftFrom = {
      opacity: -1,
      left: -100,
      position: 'relative'
    }
    const animationPropsRightFrom = {
      opacity: -1,
      right: -100,
      position: 'relative'
    }
    const animationPropsLeftTo = {
      opacity: 1,
      left: 0,
      position: 'relative'
    }
    const animationPropsRightTo = {
      opacity: 1,
      right: 0,
      position: 'relative'

    }

    const animatedItem = isDesktop ? (
      <Spring delay={index * 200} from={isEven ?
        {
          ...animationPropsLeftFrom
        } :
        {
          ...animationPropsRightFrom
        }}

        to={isEven ?
          {
            ...animationPropsLeftTo
          } :
          {
            ...animationPropsRightTo
          }}>
        {animProps => (<a.div style={animProps}>{item}</a.div>)}
      </Spring>
    ) : (
        <Spring delay={index * 200} from={{
          ...animationPropsRightFrom
        }}

          to={{
            ...animationPropsRightTo
          }}>
          {animProps => (<a.div style={animProps}>{item}</a.div>)}
        </Spring>
      )

    return animatedItem
  }

  result.onchange = useCallback((event) => setIsDesktop(event.matches), [])

  const timelineItems = props.experiences.map((experience, index) => {
    return createTimelineItem(`${experience.key}-${index}`, experience, index, isDesktop)
  })

  return (
    <Paper className={classes.experiencesPaper}>
      <TimeLine
        title={'Experiences'}
        stackedImages={!isDesktop}
        isLeft={isLeft}
        isOneWay={!isDesktop}
        wrapItem={wrapItem}>
        {timelineItems.length > 0 ? timelineItems : (<CircularProgress style={
          {
            alignSelf: 'center',
            background: this.props.theme.palette.background.default
          }
        } />)}
      </TimeLine>
    </Paper>
  )
}

export default Experiences