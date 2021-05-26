module.exports =  async (pool, isEnd = false) => {
  console.log('migrate 25-05-2021 start')
  const migrateQuery = `
    ALTER TABLE noval ADD COLUMN IF NOT EXISTS "isBlockedScrap" boolean DEFAULT false;
    ALTER TABLE noval ADD COLUMN IF NOT EXISTS "chapNumber" integer;
    ALTER TABLE noval ADD COLUMN IF NOT EXISTS "shortDescription" text;
    ALTER TABLE noval ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
    ALTER TABLE chapter ADD COLUMN IF NOT EXISTS "isActive" boolean DEFAULT true;
    ALTER TABLE chapter ADD COLUMN IF NOT EXISTS "isCrawledSuccess" boolean DEFAULT false;
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