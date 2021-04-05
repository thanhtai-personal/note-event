const migrate240321 = require('./migrate240321')
const migrate250321 = require('./migrate250321')
const migrate290321 = require('./migrate290321')
const migrate050421 = require('./migrate050421')
module.exports =  {
  excute: async (pool) => {
    await migrate240321(pool)
    await migrate250321(pool)
    await migrate290321(pool)
    await migrate050421(pool, true)
  }
}