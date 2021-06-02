import AbstractModel from './abstractModel'

class Sprite2D extends AbstractModel {
  constructor (width, height, miliSecondPerFrame, index, numloop, frameList, firstFrame, lastFrame) {
    super(width, height, miliSecondPerFrame, index, numloop)
    this.multiFrameList = frameList
    this.firstFrame = firstFrame
    this.lastFrame = lastFrame
  }

  update = (stylesObj, shouldRerender = true) => {
    this.counter += 1
    if (this.counter >= this.miliSecondPerFrame) {
      this.counter = this.counter - this.miliSecondPerFrame
      this.numloop = this.numloop + 1
      this.index = this.index + 1
      if (shouldRerender) this.draw(stylesObj)
    }
  }

  draw = (stylesObj) => {
    if (isrun == true) {
      if (index < this.firstframe) index = this.firstframe;
      if (index >= this.firstframe && index < this.lastframe)
        this.multiFrameList?.draw(index, stylesObj);
      if (index >= this.lastframe) {
        index = this.firstframe;
        this.multiFrameList?.draw(this.lastframe, stylesObj);
      }
    }
    else {
      this.multiFrameList?.draw(this.lastframe - 2, stylesObj);
    }
  }
}

export default Sprite2D