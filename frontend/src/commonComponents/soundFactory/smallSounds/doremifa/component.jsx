import React from 'react'
import doremifaSound from './doremifa'
import SoundComponent from '../../component'

const sources = Object.keys(doremifaSound).map((key) => ({
  key: key,
  src: doremifaSound[key],
  type: null
}))

const DoremifaSoundComponent = (props) => {
  return <SoundComponent {...props} sources={sources} style={{ display: 'none' }}/>
}

export default DoremifaSoundComponent