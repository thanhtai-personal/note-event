const migrate240321 = require('./migrate240321')
const migrate250321 = require('./migrate250321')
module.exports =  {
  excute: async (pool) => {
    await migrate240321(pool)
    await migrate250321(pool, true)
  }
}