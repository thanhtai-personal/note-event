module.exports =  async (pool, isEnd = false) => {
  console.log('migrate 29-03-2021 start')
  const createClientTableQuery = `CREATE TABLE IF NOT EXISTS "client"
  (
      id uuid NOT NULL,
      "userAgent" text COLLATE pg_catalog."default",
      "userId" uuid,
      password text COLLATE pg_catalog."default" NOT NULL,
      token text COLLATE pg_catalog."default",
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "lastLoginTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" uuid,
      "createdBy" uuid,
      "isActive" boolean DEFAULT true,
      CONSTRAINT client_pkey PRIMARY KEY (id),
      CONSTRAINT fkey_client_user FOREIGN KEY ("userId")
        REFERENCES "user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )`

  try {
    await pool.query(createClientTableQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}