import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import cssVariable from 'root/utils/cssVariable'
import Color from 'root/utils/color'
import { singleSoundKeys } from 'root/commonComponents/soundFactory/smallSounds/singleSound/singleSounds'
import { Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  flashWord: {
    fontWeight: 550,
    color: Color.originWhite,
    lineHeight: '28px !important',
    fontSize: '60px',
    cursor: 'text',
    fontFamily: `'Potta One', cursive`, //'font-file-82132',
    textRendering: 'optimizeLegibility',
    '&:hover': {
      animation: `$tCharAnimHover 500ms ${theme.transitions.easing.easeIn}`,
      color: Color.green
    }
  },
  '@keyframes tCharAnimHover': {
    '0%': {
      fontSize: '60px'
    },
    '70%': {
      fontSize: '80px'
    },
    '100%': {
      fontSize: '60px',
      color: Color.green
    }
  },
  subTitle: {
    fontWeight: 400,
    color: Color.gray1,
    fontSize: '11px',
    marginTop: '20px',
    letterSpacing: '3px',
    paddingLeft: theme.spacing(4)
  },
  contactBtn: {
    color: Color.green,
    border: `solid 1px ${Color.green}`,
    marginLeft: theme.spacing(4),
    minWidth: '200px',
    marginTop: theme.spacing(6),
    '&:hover': {
      backgroundColor: Color.yellow,
      color: Color.darkblue
    }
  },
  homePage: {
    backgroundColor: Color.black1,
    height: '100vh',
    paddingLeft: cssVariable.contentPaddingLeft
  },
  tChar: {
    color: Color.orange,
    animation: `$tCharAnim 1000ms ${theme.transitions.duration.standard}`,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    fontSize: '80px',
    textShadow: `5px 5px ${Color.green}`,
    '&:hover': {
      color: `${Color.orange}!important`
    }
  },
  '@keyframes tCharAnim': {
    '0%': {
      border: `solid 0px ${Color.black1}`
    },
    '100%': {
      border: `solid 1px ${Color.green}`
    }
  },
  tag: {
    color: Color.gray1,
    fontStyle: 'italic',
    fontFamily: `'La Belle Aurore',cursive`,
    letterSpacing: '3px'
  },
  topTags: {
    paddingTop: theme.spacing(3)
  },
  bottomTags: {
    marginBottom: theme.spacing(2),
    marginTop: '100px'
  },
  textZone: {
    textRendering: 'optimizeLegibility',
  },
  tab1: {
    paddingLeft: theme.spacing(2)
  },
  titleText: {
    paddingLeft: theme.spacing(6),
    animation: `$appearTextAnim1 2000ms ${theme.transitions.easing.easeIn}`,
    textRendering: 'optimizeLegibility',
    fontFamily: `'Potta One', cursive`
  },
  '@keyframes appearTextAnim1': {
    '0%': {
      opacity: 0,
      marginLeft: '-100px'
    },
    '100%': {
      opacity: 1,
      marginLeft: '0%'
    }
  },
  appearText: {
    animation: `$appearTextAnim 350ms ${theme.transitions.easing.easeIn}`,
  },
  '@keyframes appearTextAnim': {
    '0%': {
      borderBottom: `solid 3px ${Color.yellow}`,
    },
    '100%': {
      borderBottom: 0
    }
  },
  aboutContent: {
    marginTop: '60px'
  },
  aboutContentText: {
    color: 'beige',
    maxWidth: '600px',
    wordWrap: 'break-word',
    overflow: 'break-word',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(6),
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '2px',
    animation: `$aboutContentAppear 350ms ${theme.transitions.easing.easeIn}`,
  },
  '@keyframes aboutContentAppear': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1
    }
  },
  titleText2: {
    fontSize: '60px',
    letterSpacing: '1px',
    fontWeight: 450,
    wordWrap: 'break-word',
    maxWidth: '400px',
    fontFamily: `'Potta One', cursive`
  }
}))

const helloSent = `Hi, I’m Tài Trần, Web developer.`

const HomeComponent = (props) => {
  const { activeMenu } = props
  const classes = useStyles()

  const [title, setTitle] = useState(helloSent)
  const [contentText, setContentText] = useState({})

  const handleClickContactMe = useCallback(() => {
    window.triggerSingleSoundsByKey
      && typeof window.triggerSingleSoundsByKey === 'function'
      && window.triggerSingleSoundsByKey(singleSoundKeys.superMario, window.singleSoundsList)
    window.open('/profilev1', '_blank')
  }, [])

  useEffect(() => {
    switch (activeMenu) {
      case 'home':
        setTitle(helloSent)
        setContentText({})
        break;
      case 'about':
        setTitle('About me')
        setContentText({
          text1: 'Professionally connected with the web development industry and information technology for many years.',
          text2: 'Well-organised person, problem solver, independent employee with high attention to detail. Fan of football, Manchester United.',
          text3: 'Interested in the entire frontend spectrum and working on ambitious projects with positive people.',
        })
        break;
      case 'skills':
        setTitle('Skills & Experiences')
        setContentText({
          text1: 'The main area of my expertise is front end development (client side of the web).',
          text2: 'HTML, CSS, JS, TypeScript, building small and medium web apps with ReactJS, class, hooks, redux, animation, phaser and coding interactive layouts.',
          text3: 'I have also full-stack developer experience with .Net, expressJS, java, scalaJS',
        })
        break;
      case 'contact':
        setTitle('Contact me')
        setContentText({
          text1: 'I am interested in freelance opportunities. However, if you have other request or question, don’t hesitate to contact me.',
          text2: '',
          text3: '',
        })
        break;
      case 'gallery':
        setTitle('')
        setContentText({
          text1: '',
          text2: '',
          text3: '',
        })
        break;
      default:
        return
    }
  }, [activeMenu])

  return (
    <div className={classes.homePage}>
      <Typography className={[classes.tag, classes.topTags].join(' ')}> &lt;html&gt;<br /> &nbsp;&nbsp;&nbsp;&lt;body&gt;</Typography>
      <div className={classes.textZone}>
        <Typography className={[classes.tag, classes.tab1].join(' ')}> &nbsp;&nbsp;&nbsp;&lt;h1&gt;</Typography>
        <Typography aria-label={title} variant={'h1'} className={classes.titleText} style={
          activeMenu === 'home' ? {
          } : {
              color: Color.green,
              fontWeight: 550,
              fontSize: '60px'
            }}>
          {activeMenu === 'home' ? title.split('').map((char, index) => {
            let delayTime = 2000 + (index * 350)
            return (
              <React.Fragment key={`${char}-${index}`}>
                <span className={[classes.flashWord, char === 'T' ? classes.tChar : '', classes.appearText].join(' ')}
                  style={{
                    animationDelay: `${delayTime}ms`
                  }}
                >{char}</span>
                {char === ',' && <br />}
              </React.Fragment>
            )
          }) : <Typography className={classes.titleText2}
          >{title}</Typography>}
        </Typography>
        <Typography className={[classes.tag, classes.tab1].join(' ')}> &nbsp;&nbsp;&nbsp;&lt;/h1&gt;</Typography>
        {activeMenu === 'home' && <Typography variant={'h2'} className={classes.subTitle}>
          Back/Front End Developer / Node - ReactJS
        </Typography>}
        {activeMenu !== 'home' && activeMenu !== 'gallery' && <div className={classes.aboutContent}>
          <Typography variant={'h3'} align={'left'} className={classes.aboutContentText}>
            {contentText.text1}
          </Typography>
          <Typography variant={'h3'} align={'left'} className={classes.aboutContentText}>
            {contentText.text2}
          </Typography>
          <Typography variant={'h3'} align={'left'} className={classes.aboutContentText}>
            {contentText.text3}
          </Typography>
        </div>}
        <br />
        {(activeMenu === 'home' || activeMenu === 'contact') && <Button onClick={handleClickContactMe} className={classes.contactBtn}> Contact me! </Button>}
      </div>
      <Typography className={[classes.tag, classes.bottomTags].join(' ')}> &nbsp;&nbsp;&nbsp;&lt;/body&gt;<br /> &lt;/html&gt; </Typography>
    </div>
  )
}

export default HomeComponent