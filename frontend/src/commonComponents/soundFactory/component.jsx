import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import Color from 'root/utils/color'
import doremifaSound from './smallSounds/doremifa/doremifa'
import { doremifaKeys } from './smallSounds/doremifa/doremifa'

const triggerDoremifaSoundsByKey = (key, audioList, setText) => {
  switch (key?.toLowerCase()) {
    case 'q':
    case 'a':
    case doremifaKeys.do:
      setText && setText(audioList[0].key)
      audioList[0]?.player.play()
      break;
    case 'w':
    case 's':
    case doremifaKeys.re:
      setText && setText(audioList[2].key)
      audioList[2]?.player.play()
      break;
    case 'e':
    case 'd':
    case doremifaKeys.mi:
      setText && setText(audioList[4].key)
      audioList[4]?.player.play()
      break;
    case 'r':
    case 'f':
    case doremifaKeys.fa:
      setText && setText(audioList[6].key)
      audioList[6]?.player.play()
      break;
    case 'u':
    case 'j':
    case doremifaKeys.sol:
      setText && setText(audioList[8].key)
      audioList[8]?.player.play()
      break;
    case 'i':
    case 'k':
    case doremifaKeys.la:
      setText && setText(audioList[10].key)
      audioList[10]?.player.play()
      break;
    case 'o':
    case 'l':
    case doremifaKeys.si:
      setText && setText(audioList[12].key)
      audioList[12]?.player.play()
      break;
    case 'p':
    case ';':
    case doremifaKeys.doOct:
      setText && setText(audioList[14].key)
      audioList[14]?.player.play()
      break;
    case 'z':
    case doremifaKeys.do2:
      setText && setText(audioList[1].key)
      audioList[1]?.player.play()
      break;
    case 'x':
    case doremifaKeys.re2:
      setText && setText(audioList[3].key)
      audioList[3]?.player.play()
      break;
    case 'c':
    case doremifaKeys.mi2:
      setText && setText(audioList[5].key)
      audioList[5]?.player.play()
      break;
    case 'v':
    case doremifaKeys.fa2:
      setText && setText(audioList[7].key)
      audioList[7]?.player.play()
      break;
    case 'm':
    case doremifaKeys.sol2:
      setText && setText(audioList[9].key)
      audioList[9]?.player.play()
      break;
    case ',':
    case doremifaKeys.la2:
      setText && setText(audioList[11].key)
      audioList[11]?.player.play()
      break;
    case '.':
    case doremifaKeys.si2:
      setText && setText(audioList[13].key)
      audioList[13]?.player.play()
      break;
    case '/':
    case doremifaKeys.doOct2:
      setText && setText(audioList[15].key)
      audioList[15]?.player.play()
      break;
    default:
      setText && setText('')
      break;
  }
}

const sources = Object.keys(doremifaSound).map((key) => ({
  key: key,
  src: doremifaSound[key],
  type: null,
}))

const useStyles = makeStyles((theme) => ({
  soundInfo: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    float: 'right',
    color: Color.white
  },
  audioContainer: {
    display: 'none'
  },
  doremifa: {
    position: 'absolute',
    top: '15px',
    right: '120px',
    float: 'right',
    color: Color.green,
    border: 'solid 1px',
    textTransform: 'capitalize'
  }
}))

const SoundComponent = (props) => {
  const classes = useStyles()
  const [offSound, setOffSound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioMapping, setAudioMapping] = useState(null)
  const [audioList, setAudioList] = useState([])
  //eslint-disable-next-line
  const [doremiText, setDoremiText] = useState('')

  const handleclickSound = useCallback(() => {
    setOffSound(!offSound)
    setDoremiText('')
  }, [offSound])

  useEffect(() => {
    setLoading(true)
    let _audioList = []
    let audioMappingObj = {}
    let audioContainer = document.getElementById('audio-container')
    sources.forEach((source, index) => {
      let audioElement = document.createElement('audio')
      audioElement.src = source.src
      audioElement.id = source.key || `audio-${index}`
      audioElement.controls = !(source.controls === false)
      audioElement.type = source.type || 'audio/mpeg'
      // audioElement.autoplay = true
      audioContainer.appendChild(audioElement)
      _audioList.push({
        key: source.key,
        // player: new Audio(source.src),
        player: audioElement
      })
      audioMappingObj[source.key] = {
        player: audioElement,
        name: source.key
      }
    })
    setAudioMapping(audioMappingObj)
    setAudioList(_audioList)
    setLoading(false)
  }, [])

  const handleKeyPress = useCallback((e) => {
    if (!audioMapping || offSound) return
    triggerDoremifaSoundsByKey(e.key, audioList, setDoremiText)
  }, [audioList, offSound, audioMapping])

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    window.triggerDoremifaSoundsByKey = triggerDoremifaSoundsByKey
    window.doremifaAudios = audioList
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      window.doremifaAudios = null
      window.triggerDoremifaSoundsByKey = null
    }
  }, [audioList, offSound, audioMapping, handleKeyPress])

  return (
    <>
      <Button className={classes.soundInfo} onClick={handleclickSound}>SOUND: {loading ? 'Loading...' : offSound ? ' Off' : '  On'}</Button>
      <Typography className={classes.doremifa}>{doremiText}</Typography>
      <div id='audio-container' className={classes.audioContainer}></div>
    </>
  )
}

export default SoundComponent