module.exports = async (pool, isEnd) => {
  console.log('migrate 13-05-2021 start')
  const novalCreateQuery = `CREATE TABLE IF NOT EXISTS noval
  (
      id uuid NOT NULL,
      name text,
      url text,
      "group" text,
      "shortDescription" text,
      "intro" text,
      "imageUrl" text,
      "imageAltName" text,
      "isDelete" boolean DEFAULT false,
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" uuid,
      "createdBy" uuid,
      CONSTRAINT noval_pkey PRIMARY KEY (id)
  );`

  const chapterCreateQuery = `CREATE TABLE IF NOT EXISTS chapter
  (
      id uuid NOT NULL,
      "novalId" uuid NOT NULL,
      title text,
      content text,
      url text,
      "isDelete" boolean DEFAULT false,
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT chapter_pkey PRIMARY KEY (id),
      "updatedBy" uuid,
      "createdBy" uuid,
      CONSTRAINT fkey_chapter_noval FOREIGN KEY ("novalId")
      REFERENCES "noval" (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
  );`
  try {
    await pool.query(novalCreateQuery)
    await pool.query(chapterCreateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}