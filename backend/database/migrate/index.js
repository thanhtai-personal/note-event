import migrate240321 from './migrate240321'
export default {
  excute: async (pool) => {
    await migrate240321(pool, true)
  }
}