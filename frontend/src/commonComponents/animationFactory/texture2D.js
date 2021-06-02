import React from 'react'

class Texture2D {
  //in texture2d, image fixed in frame
  constructor (props) {
    const { widthFrame, heightFrame, src } = props
    this.width = widthFrame
    this.height = heightFrame
    this.src = src
  }

  draw = (key) => {
    return (
      <div key={`texture-2d-${key}`} style={{ width: this.width, height: this.height }}>
        <img src={`url(${this.src})`} style={{ width: '100%', height: 'auto' }}></img>
      </div>
    )
  }
}

export default Texture2D