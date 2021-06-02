import React from 'react'
import { makeStyles, Container, Paper, Grid, useMediaQuery } from '@material-ui/core'
import { useLazyLoadSection, makeLazyLoadBackgroundImage } from 'root/utils/renderHelper'
import BannerComponent from './banner'
import Footer from './footer'
import ProfileComponent from './profile'
import SkillsComponent from './skills'
import HobbiesComponent from './hobbies'
import ExperiencesComponent from './experiences'

const useStyle = makeStyles(theme => {
  return {
    skills: {
      backgroundColor: '#fff',
      border: 'solid 1px',
      marginTop: theme.spacing(5),
      position: 'relative',
    },
    profile: {
      backgroundColor: 'beige',
      overflow: 'visible'
    },
    hobbies: {
      backgroundColor: 'beige',
    }
  }
})

const Portfolio = (props) => {

  const Banner = makeLazyLoadBackgroundImage(BannerComponent)
  const Profile = useLazyLoadSection(ProfileComponent, { height: '340px', elementId: 'profile' })
  const Skills = useLazyLoadSection(SkillsComponent, { height: '340px', elementId: 'skills' })
  const Hobbies = useLazyLoadSection(HobbiesComponent, { height: '152px', elementId: 'hobbies' })
  const Experiences = useLazyLoadSection(ExperiencesComponent, { height: '1407px', elementId: 'experiences' })

  const isDesktop = useMediaQuery('(min-width: 800px)')
  const classes = useStyle(props)

  return (
    <React.Fragment>
      <Container maxWidth='lg'>
        <main>
          <Banner post={props.bannerData} src={props.bannerData?.image} />
          <Grid container className={classes.profile} style={isDesktop ? {} : { height: 'auto' }}>
            <Grid item xs={isDesktop ? 9 : 12}>
              <Profile profileData={props.profileData} />
            </Grid>
            <Grid item xs={3} style={isDesktop ? {} : { display: 'none' }}>
              <Paper className={classes.skills}>
                <Skills skills={props.skills} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Experiences experiences={props.experiences} />
            </Grid>
            <Grid item xs={12} className={classes.hobbies}>
              <Hobbies hobbies={props.hobbies} />
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer title='Thank you!' description='See you again!' />
    </React.Fragment>
  )
}

export default Portfolio
