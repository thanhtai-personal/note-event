import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Color from 'root/utils/color'
import singleSounds from './smallSounds/singleSound/singleSounds'
import { singleSoundKeys } from './smallSounds/singleSound/singleSounds'

const triggerSingleSoundsByKey = (key, audioList) => {
  //eslint-disable-next-line
  switch (key) {
    case singleSoundKeys.superMario:
      try {
        audioList[0]?.player?.play()
      } catch (error) { console.log('error catched!!!') }
      break;
    case singleSoundKeys.gloryGlory:
      try {
        audioList[1]?.player?.play()
      } catch (error) { console.log('error catched!!!') }
      break;
    case singleSoundKeys.zapsplat:
      try {
        audioList[2]?.player?.play()
      } catch (error) { console.log('error catched!!!') }
      break;
  }
}

const sources = Object.keys(singleSounds).map((key) => ({
  key: key,
  src: singleSounds[key],
  type: null,
}))

const useStyles = makeStyles((theme) => ({
  soundInfo: {
    position: 'absolute',
    top: '45px',
    right: '10px',
    float: 'right',
    color: Color.white
  },
  audioContainer: {
    display: 'none'
  },
  singleSound: {
    position: 'absolute',
    top: '25px',
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

  const handleclickSound = useCallback(() => {
    setOffSound(!offSound)
  }, [offSound])

  const handleSoundByKey = useCallback((key, audioList) => {
    if (offSound) return
    triggerSingleSoundsByKey(key, audioList)
  }, [offSound])

  useEffect(() => {
    setLoading(true)
    let _audioList = []
    let audioMappingObj = {}
    let audioContainer = document.getElementById('single-sound-audio-container')
    sources.forEach((source, index) => {
      let audioElement = document.createElement('audio')
      audioElement.src = source.src
      audioElement.id = source.key || `audio-${index}`
      audioElement.controls = !(source.controls === false)
      audioElement.type = source.type || 'audio/mpeg'
      audioContainer.appendChild(audioElement)
      _audioList.push({
        key: source.key,
        player: audioElement
      })
      audioMappingObj[source.key] = {
        player: audioElement,
        name: source.key
      }
    })
    setLoading(false)
    window.singleSoundsList = _audioList
    if (!window.isPlaying) {
      try {
        handleSoundByKey(singleSoundKeys.gloryGlory, _audioList)
        window.isPlaying = true
      } catch (error) {
        window.isPlaying = false
      }
    }
    window.triggerSingleSoundsByKey = handleSoundByKey
  }, [handleSoundByKey])

  return (
    <>
      <Button className={classes.soundInfo} onClick={handleclickSound}>MUSIC: {loading ? 'Loading...' : offSound ? ' Off' : '  On'}</Button>
      <div id='single-sound-audio-container' className={classes.audioContainer}></div>
    </>
  )
}

export default SoundComponent