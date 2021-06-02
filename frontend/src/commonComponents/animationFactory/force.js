class Force {
  constructor(speed, direction, power) {
    this.speed = speed
    this.direction = direction // { row, col }
    this.power = power
    this.currentSpeed = { row: 0, col: 0 }
  }
}

export default Force