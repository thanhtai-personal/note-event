import React, { useCallback, useEffect, useState } from 'react'
import './_piano.css'
import { doremifaKeys } from 'root/commonComponents/soundFactory/smallSounds/doremifa/doremifa'

const pianoKeys = [
  {
    className: 'white',
    key: `${doremifaKeys.do}-1`,
    soundKey: doremifaKeys.do,
  },
  {
    className: 'black',
    key: `${doremifaKeys.do}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.re}-1`,
    soundKey: doremifaKeys.re,
  },
  {
    className: 'black',
    key: `${doremifaKeys.re}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.mi}-1`,
    soundKey: doremifaKeys.mi,
  },
  {
    className: 'black',
    key: `${doremifaKeys.mi}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.fa}-1`,
    soundKey: doremifaKeys.fa,
  },
  {
    className: 'black',
    key: `${doremifaKeys.fa}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.sol}-1`,
    soundKey: doremifaKeys.sol,
  },
  {
    className: 'black',
    key: `${doremifaKeys.sol}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.la}-1`,
    soundKey: doremifaKeys.la,
  },
  {
    className: 'black',
    key: `${doremifaKeys.la}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.si}-1`,
    soundKey: doremifaKeys.si,
  },
  {
    className: 'black',
    key: `${doremifaKeys.si}-2`,
  },
  {
    className: 'white',
    key: `${doremifaKeys.doOct}-1`,
    soundKey: doremifaKeys.doOct,
  },
]

const mappingKeyBoardKeyPiano = {
  a: doremifaKeys.do,
  q: doremifaKeys.do,
  s: doremifaKeys.re,
  w: doremifaKeys.re,
  d: doremifaKeys.mi,
  e: doremifaKeys.mi,
  f: doremifaKeys.fa,
  r: doremifaKeys.fa,
  j: doremifaKeys.sol,
  u: doremifaKeys.sol,
  k: doremifaKeys.la,
  i: doremifaKeys.la,
  l: doremifaKeys.si,
  o: doremifaKeys.si,
  ';': doremifaKeys.doOct,
  p: doremifaKeys.doOct,
  z: doremifaKeys.do,
  x: doremifaKeys.re,
  c: doremifaKeys.mi,
  v: doremifaKeys.fa,
  m: doremifaKeys.sol,
  ',': doremifaKeys.la,
  '.': doremifaKeys.si,
  '/': doremifaKeys.doOct,
  'nokey': 'nokey'
}

const PianoItem = (props) => {
  const { className, isActive } = props
  const [localActive, setLocalActive] = useState(isActive)

  useEffect(() => {
    setLocalActive(isActive)
    if (isActive) {
      setTimeout(() => {
        setLocalActive(false)
      }, 300)
    }
  }, [isActive])

  return (<li className={`${className} ${localActive ? 'active' : ''}`}></li>)
}

const Piano = (props) => {

  const [activeKey, setActiveKey] = useState('')

  const handlePianoKeyClick = useCallback((e) => {
    setActiveKey(mappingKeyBoardKeyPiano[e.key?.toLowerCase() || 'nokey'])
  }, [setActiveKey])

  useEffect(() => {
    window.addEventListener('keypress', handlePianoKeyClick)
    return () => {
      window.removeEventListener('keypress', handlePianoKeyClick)
    }
  }, [handlePianoKeyClick])
  return (
    <ul className='piano set'>
      {pianoKeys.map((item, index) => (
        <PianoItem
          {...item}
          key={`${item.key}-${index}`}
          isActive={activeKey === item.soundKey}
        />
      ))}
    </ul>
  )
}

export default Piano