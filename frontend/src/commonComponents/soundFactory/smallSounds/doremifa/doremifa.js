import doSound from 'root/assert/sounds/do.wav'
import doStretchedSound from 'root/assert/sounds/do-stretched.wav'
import reSound from 'root/assert/sounds/re.wav'
import reStretchedSound from 'root/assert/sounds/re-stretched.wav'
import miSound from 'root/assert/sounds/mi.wav'
import miStretchedSound from 'root/assert/sounds/mi-stretched.wav'
import faSound from 'root/assert/sounds/fa.wav'
import faStretchedSound from 'root/assert/sounds/fa-stretched.wav'
import solSound from 'root/assert/sounds/sol.wav'
import solStretchedSound from 'root/assert/sounds/sol-stretched.wav'
import laSound from 'root/assert/sounds/la.wav'
import laStretchedSound from 'root/assert/sounds/la-stretched.wav'
import siSound from 'root/assert/sounds/si.wav'
import siStretchedSound from 'root/assert/sounds/si-stretched.wav'
import doOctaveSound from 'root/assert/sounds/do-octave.wav'
import doOctaveStretchedSound from 'root/assert/sounds/do-stretched-octave.wav'

export const doremifaKeys = {
  do: 'do',
  do2: 'do2',
  re: 're',
  re2: 're2',
  mi: 'mi',
  mi2: 'mi2',
  fa: 'fa',
  fa2: 'fa2',
  sol: 'sol',
  sol2: 'sol2',
  la: 'la',
  la2: 'la2',
  si: 'si',
  si2: 'si2',
  doOct: 'doOct',
  doOct2: 'doOct2',
}

const doremifaSound = {
  [doremifaKeys.do]: doSound,
  [doremifaKeys.do2]: doStretchedSound,
  [doremifaKeys.re]: reSound,
  [doremifaKeys.re2]: reStretchedSound,
  [doremifaKeys.mi]: miSound,
  [doremifaKeys.mi2]: miStretchedSound,
  [doremifaKeys.fa]: faSound,
  [doremifaKeys.fa2]: faStretchedSound,
  [doremifaKeys.sol]: solSound,
  [doremifaKeys.sol2]: solStretchedSound,
  [doremifaKeys.la]: laSound,
  [doremifaKeys.la2]: laStretchedSound,
  [doremifaKeys.si]: siSound,
  [doremifaKeys.si2]: siStretchedSound,
  [doremifaKeys.doOct]: doOctaveSound,
  [doremifaKeys.doOct2]: doOctaveStretchedSound,
}

export default doremifaSound