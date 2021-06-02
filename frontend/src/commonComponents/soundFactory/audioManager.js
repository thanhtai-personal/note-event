const errorMessage = {
  connectionUrl: 'null connection url'
}

const listPropertiesGet = [
  'audioTracks', 'buffered', 'controller', 'currentSrc', 'duration',
  'ended', 'error', 'networkState', 'paused', 'played', 'readyState',
  'seekable', 'seeking', 'startDate', 'textTracks', 'videoTracks'
]

const listPropertiesSet = [
  'autoplay', 'controls', 'crossOrigin', 'currentTime', 'defaultMuted',
  'defaultPlaybackRate', 'loop', 'mediaGroup', 'muted', 'playbackRate',
  'preload', 'volume'
]

const listEvents = [
  'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied',
  'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause',
  'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled',
  'suspend', 'timeupdate', 'volumechange', 'waiting'
]

const listActions = [
  'addTextTrack', 'canPlayType', 'load', 'play', 'pause'
]

const AudioPlayer = (props) => {
  let returnData = {
    connectionUrl: props.src || '',
    error: {},
    isVideo: props.isVideo,
    isList: false,
  },
  player = {},
  autoChangeMusicCallBack = null

  const setAutoChangeMusicCallBack = (callback) => {
    autoChangeMusicCallBack = callback
  }

  returnData.addSound = (data) => {
    const addData = (_data, isList) => {
      if (!returnData.soundListPlayer) {
        if (!returnData.isList) {
          returnData.isList = true
          returnData.soundListPlayer.push({
            key: `sound-1`,
            src: typeof returnData.src === 'string' ? returnData.src : '',
            ...returnData
          })
        }
      }
      if (isList) {
        data.forEach ((snd) => {
          returnData.soundListPlayer.push({
            ...snd,
            isPlaying: false
          })
        })
      } else {
        returnData.soundListPlayer.push({
          src: data,
          isPlaying: false
        })
      }
      let currentPlay = returnData.soundListPlayer.findIndex((snd) => snd.isPlaying)
      returnData.soundListPlayer = returnData.soundListPlayer.map((snd, index) => ({
        ...snd,
        key: `sound-${index + 1}`,
        isPlaying: index === 0 && currentPlay === -1 ? true : snd.isPlaying
      }))   
    }
    if (typeof data === 'string') {
      addData(data, false)
    } else if (data && data !== {}) {
      addData(data, true)
    }
  }

  const getPlayerData = (key) => {
    if (listPropertiesGet.includes(key)) {
      return player[key]
    }
    if (listPropertiesSet.includes(key)) {
      return player[key]
    }
    return ''
  }

  const setPlayerData = (key, value) => {
    if (listPropertiesSet.includes(key)) {
      player[key] = value
    }
  }
  
  const runPlayer = (actionName) => {
    if (listActions.includes(actionName)) {
      switch(actionName) {
        default:
          typeof player[actionName] === 'function' && player[actionName]()
          break
      }
    }
  }

  const playCurrentSound = (isPlay, customSound) => {
    let _sound = customSound || returnData.soundListPlayer.find((s) => s.key === `sound-${returnData.currentSound + 1}`)
    if (_sound.isVideo) {
      player = document.createElement("video")
      player.setAttribute("src", _sound.src)
    } else if (typeof player.setAttribute === 'function') {
      player.pause()
      player.setAttribute("src", _sound.src)
    } else player = new Audio(_sound.src)
    if (isPlay) {
      player.pause()
      player.load()
      player.play()
    } 
  }

  const getCurrentSoundData = () => {
    if (!returnData.isList) return
    return returnData.soundListPlayer[returnData.currentSound]
  }

  if (props.src && Array.isArray(props.src)) {
    returnData.soundListPlayer = props.src.map((s, index) => ({
      key: `sound-${index + 1}`,
      src: typeof s === 'string' ? s : s.src,
      name: typeof s === 'string' ? 'unknow' : s.name,
      isVideo: props.isVideo,
      isPlaying: index === 0 ? true : false,
      ...s
    }))
    returnData.isList = true
    returnData.currentSound = 0
    returnData.next = () => {
      returnData.soundListPlayer[returnData.currentSound].isPlaying = false
      returnData.currentSound = returnData.currentSound === returnData.soundListPlayer.length - 1 ? 0 : returnData.currentSound + 1
      returnData.soundListPlayer[returnData.currentSound].isPlaying = true
      playCurrentSound(true)
    }
    returnData.prev = () => {
      returnData.soundListPlayer[returnData.currentSound].isPlaying = false
      returnData.currentSound = returnData.currentSound === 0 ? 0 : returnData.currentSound - 1
      returnData.soundListPlayer[returnData.currentSound].isPlaying = true
      playCurrentSound(true)
    }
    returnData.getCurrentSoundData = () => {
      return returnData.soundListPlayer.find((s) => s.key === `sound-${returnData.currentSound + 1}`)
    }
  } else {
    if (!returnData.connectionUrl) {
      returnData.error.message = errorMessage.connectionUrl
    } else {
      let cSound = {
        src: returnData.connectionUrl,
        isVideo: props.isVideo
      }
      playCurrentSound(false, cSound)
    }
  }

  listPropertiesSet.forEach((key) => {
    if (props[key]) player[key] = props[key]
  })
  listEvents.forEach((key) => {
    if (props[key] && typeof props[key] === 'function') player.addEventListener(key, props[key])
  })
  playCurrentSound(false)
  if (returnData.isList) {
    player.addEventListener('ended', () => {
      returnData.next()
      typeof autoChangeMusicCallBack === 'function' && autoChangeMusicCallBack(returnData.getCurrentSoundData())
    })
  }
  returnData.renderedElement = player
  

  return {
    ...returnData,
    getData: getPlayerData,
    setData: setPlayerData,
    getCurrentSound: getCurrentSoundData,
    run: runPlayer,
    setAutoChangeMusicCallBack: setAutoChangeMusicCallBack
  }
}

export default AudioPlayer