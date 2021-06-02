class AbstractModel {
  constructor(width, height, miliSecondPerFrame, index, numloop) {
    this.frameList = []
    this.multiFrameList = {}
    this.width = width
    this.height = height
    this.mouseHere = false
    this.counter = 0
    this.miliSecondPerFrame = miliSecondPerFrame
    this.index = index
    this.numloop = numloop
    this.firstFrame = 0
    this.lastFrame = 0
    this.isRun = true
    this.position = {}
  }

  update = (stylesObj, shouldRerender) => {

  }

  draw = (stylesObj) => {
    
  }
}

export default AbstractModel