import migrate240321 from './migrate240321'
import migrate250321 from './migrate250321'
export default {
  excute: async (pool) => {
    await migrate240321(pool)
    await migrate250321(pool, true)
  }
}