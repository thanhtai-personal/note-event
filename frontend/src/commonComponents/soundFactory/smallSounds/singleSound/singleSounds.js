import superMario from 'root/assert/sounds/supermario.mp3'
import gloryGlory from 'root/assert/sounds/gloryglory.mp3'
import zapsplat from 'root/assert/sounds/zapsplat.mp3'

export const singleSoundKeys = {
  superMario: 'superMario',
  gloryGlory: 'gloryGlory',
  zapsplat: 'zapsplat'
}

const singleSounds = {
  [singleSoundKeys.superMario]: superMario,
  [singleSoundKeys.gloryGlory]: gloryGlory,
  [singleSoundKeys.zapsplat]: zapsplat,
}

export default singleSounds