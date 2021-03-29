module.exports =  async (pool, isEnd = false) => {
  console.log('migrate 24-03-2021 start')
  const migrateQuery = `
    ALTER TABLE googleaccount ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
    ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
    ALTER TABLE resource ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
    ALTER TABLE eventnote ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
  `
  try {
    await pool.query(migrateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}