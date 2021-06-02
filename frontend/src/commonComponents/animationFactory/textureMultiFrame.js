import React from 'react'
import Rectangle from './rectangle'

class TextureMultiFrame {
  constructor(texture, widthFrame, heightFrame, key) {
    this.key = key || 'texture-multi-frame'
    this.texture = texture
    this.width = widthFrame
    this.height = heightFrame
    this.xWidth = parseInt(texture.width / widthFrame)
    this.yHeight = parseInt(texture.height / heightFrame)
    this.dataColor = []
    this.currentRectangle = new Rectangle()
    this.frameList = [] //count = xWidth * yHeight
    this.length = this.xWidth * this.yHeight
    for (let i = 0; i < this.yHeight; i++) {
      for (let j = 0; j < this.xWidth; j++) {
        this.frameList.push(new Rectangle(widthFrame * j, heightFrame * i, widthFrame, heightFrame))
      }
    }
  }

  draw = (index, stylesObj) => {
    const rectangle = index < 0 ? this.frameList[0] : (index < this.length ? this.frameList[index] : this.frameList[this.length - 1])
    return (
      <div id={`${this.key}-${index || 0}`} style={{ ...stylesObj, width: this.width, height: this.height, overflow: 'hidden' }}>
        <img src={this.texture?.src} style={{ width: this.texture.width, height: this.texture.height
          , objectFit: 'cover', objectPosition: `-${rectangle.left}px -${rectangle.top}px`
        }}>
        </img>
      </div>
    )
  }
}

export default TextureMultiFrame