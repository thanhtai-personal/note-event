const migrate240321 = require('./migrate240321')
const migrate250321 = require('./migrate250321')
const migrate290321 = require('./migrate290321')
const migrate050421 = require('./migrate050421')
const migrate070421 = require('./migrate070421')
const migrate130521 = require('./migrate130521')
const migrate250521 = require('./migrate250521')
module.exports =  {
  execute: async (pool) => {
    await migrate240321(pool)
    await migrate250321(pool)
    await migrate290321(pool)
    await migrate050421(pool)
    await migrate070421(pool)
    await migrate130521(pool)
    await migrate250521(pool, true)
  }
}