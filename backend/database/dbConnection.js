const pool = require('./dev/pool')
const migrate = require('./migrate')

if (!pool) console.log('No pool!!!')

pool.on('connect', () => {
  console.log('connected to the db')
})

/**
 * Create User Table
 */
const createUserTable = async (isEnd = false) => {
  console.log('createUserTable start')
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS "user"
  (
      id uuid NOT NULL,
      "googleId" text COLLATE pg_catalog."default",
      username text COLLATE pg_catalog."default" NOT NULL,
      password text COLLATE pg_catalog."default" NOT NULL,
      token text COLLATE pg_catalog."default",
      "createdTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "lastLoginTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT user_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(userCreateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Create resource Table
 */
const createResourceTable = async (isEnd = false) => {
  console.log('query start')
  const resourceCreateQuery = `CREATE TABLE IF NOT EXISTS resource
  (
      id uuid NOT NULL,
      "userId" uuid NOT NULL,
      name text COLLATE pg_catalog."default",
      description text COLLATE pg_catalog."default",
      url text COLLATE pg_catalog."default",
      "accountId" uuid,
      "createdTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "eventId" uuid,
      CONSTRAINT resource_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(resourceCreateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Create Google Account Table
 */
const createGoogleAccountTable = async (isEnd = false) => {
  console.log('createGoogleAccountTable start')
  const googleAccountCreateQuery = `CREATE TABLE IF NOT EXISTS googleaccount
  (
      id uuid NOT NULL,
      email text COLLATE pg_catalog."default" NOT NULL,
      token text COLLATE pg_catalog."default",
      "userId" uuid,
      "createdTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "currentUsing" boolean DEFAULT false,
      CONSTRAINT googleaccount_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(googleAccountCreateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Create Event Note Table
 */
const createEventNoteTable = async (isEnd = false) => {
  console.log('createEventNoteTable start')
  const eventNoteCreateQuery = `CREATE TABLE IF NOT EXISTS eventnote
  (
      id uuid NOT NULL,
      "userId" uuid NOT NULL,
      "contentText" text COLLATE pg_catalog."default",
      "contentHtml" text COLLATE pg_catalog."default",
      "createdTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedTime" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT eventnote_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(eventNoteCreateQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Drop User Table
 */
const dropUserTable = async (isEnd = false) => {
  console.log('dropUserTable start')
  const userDropQuery = `DROP TABLE IF EXISTS "user"`
  try {
    await pool.query(userDropQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}


/**
 * Drop Resource Table
 */
const dropResourceTable = async (isEnd = false) => {
  console.log('dropResourceTable start')
  const resourceDropQuery = `DROP TABLE IF EXISTS "resource"`
  try {
    await pool.query(resourceDropQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Drop Google account Table
 */
const dropGoogleAccount = async (isEnd = false) => {
  console.log('dropGoogleAccount start')
  const googleAccountDropQuery = `DROP TABLE IF EXISTS "googleaccount"`
  try {
    await pool.query(googleAccountDropQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

/**
 * Drop Bus Table
 */
const dropEventNoteTable = async (isEnd = false) => {
  console.log('dropEventNoteTable start')
  const eventNoteDropQuery = `DROP TABLE IF EXISTS "eventnote"`
  try {
    await pool.query(eventNoteDropQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

const createReferenceKey = async (isEnd = false) => {
  console.log('createReferenceKey start')
  const createReferenceKeyQueryResource = `ALTER TABLE resource ADD CONSTRAINT fkey_resource_event_note FOREIGN KEY ("eventId")
    REFERENCES eventnote (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ADD CONSTRAINT fkey_resource_google_account FOREIGN KEY ("accountId")
    REFERENCES googleaccount (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ADD CONSTRAINT fkey_resource_user FOREIGN KEY ("userId")
    REFERENCES "user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION`
  const createReferenceKeyQueryGoogleAccount = `ALTER TABLE googleaccount ADD CONSTRAINT fkey_googleaccount_user FOREIGN KEY ("userId")
    REFERENCES "user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION`
  const createReferenceKeyQueryEventNote = `ALTER TABLE eventnote ADD CONSTRAINT fkey_eventnote_user FOREIGN KEY ("userId")
    REFERENCES "user" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION`
  try {
    await pool.query(createReferenceKeyQueryResource)
    console.log('querry success')
    await pool.query(createReferenceKeyQueryGoogleAccount)
    await pool.query(createReferenceKeyQueryEventNote)
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}

const dropReferenceKey = async (isEnd = false) => {
  console.log('dropReferenceKey start')
  const createReferenceKeyQueryResource = `ALTER TABLE resource DROP CONSTRAINT IF EXISTS fkey_resource_event_note,
  DROP CONSTRAINT IF EXISTS fkey_resource_google_account,
  DROP CONSTRAINT IF EXISTS fkey_resource_user`
  const createReferenceKeyQueryGoogleAccount = `ALTER TABLE googleaccount DROP CONSTRAINT IF EXISTS fkey_googleaccount_user`
  const createReferenceKeyQueryEventNote = `ALTER TABLE eventnote DROP CONSTRAINT IF EXISTS fkey_eventnote_user`
  try {
    await pool.query(createReferenceKeyQueryResource)
    await pool.query(createReferenceKeyQueryGoogleAccount)
    await pool.query(createReferenceKeyQueryEventNote)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}


/**
 * Create All Tables
 */
module.exports = {
  createAllTables: async () => {
    await createUserTable()
    await createResourceTable()
    await createGoogleAccountTable()
    await createEventNoteTable()
    await createReferenceKey(true)
  }
  ,

  /**
   * Drop All Tables
   */
  dropAllTables: async () => {
    await dropReferenceKey()
    await dropUserTable()
    await dropResourceTable()
    await dropGoogleAccount()
    await dropEventNoteTable(true)
  },

  /**
   * migrate
   */
  migrateData: async () => {
    await migrate.excute(pool)
  }
}
pool.on('remove', () => {
  console.log('client removed')
  process.exit(0)
})

require('make-runnable')