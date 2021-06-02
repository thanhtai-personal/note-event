
import AbstractModel from './abstractModel'

class VisibleEntity {
  constructor(styleObj) {
    this.model = new AbstractModel(0, 0)
    this.styleObj = styleObj
  }

  update = () => {
    this.model.update(this.styleObj, true)
  }

  draw = () => {
    this.model.draw(this.styleObj)
  }

}

export default VisibleEntity