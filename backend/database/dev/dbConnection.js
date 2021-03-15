import pool from './pool'

pool.on('connect', () => {
  console.log('connected to the db')
})

/**
 * Create User Table
 */
const createUserTable = async (isEnd = false) => {
  console.log('====createUserTable====')
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (
      id uuid NOT NULL,
      "googleId" text COLLATE pg_catalog."default",
      username text COLLATE pg_catalog."default" NOT NULL,
      password text COLLATE pg_catalog."default" NOT NULL,
      token text COLLATE pg_catalog."default",
      "createdTime" timestamp without time zone,
      "updatedTime" timestamp without time zone,
      "lastLoginTime" timestamp without time zone,
      CONSTRAINT user_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(userCreateQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Create resource Table
 */
const createResourceTable = async (isEnd = false) => {
  console.log('====createResourceTable====')
  const resourceCreateQuery = `CREATE TABLE IF NOT EXISTS resource
  (
      id uuid NOT NULL,
      "userId" uuid NOT NULL,
      name text COLLATE pg_catalog."default",
      description text COLLATE pg_catalog."default",
      url text COLLATE pg_catalog."default",
      "accountId" uuid,
      "createdTime" timestamp without time zone,
      "updatedTime" timestamp without time zone,
      "eventId" uuid,
      CONSTRAINT resource_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(resourceCreateQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Create Google Account Table
 */
const createGoogleAccountTable = async (isEnd = false) => {
  console.log('====createGoogleAccountTable====')
  const googleAccountCreateQuery = `CREATE TABLE IF NOT EXISTS googleaccount
  (
      id uuid NOT NULL,
      email text COLLATE pg_catalog."default" NOT NULL,
      token text COLLATE pg_catalog."default",
      "userId" uuid,
      "createdTime" timestamp without time zone,
      "updatedTime" timestamp without time zone,
      "currentUsing" boolean DEFAULT false,
      CONSTRAINT googleaccount_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(googleAccountCreateQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Create Event Note Table
 */
const createEventNoteTable = async (isEnd = false) => {
  console.log('====createEventNoteTable====')
  const eventNoteCreateQuery = `CREATE TABLE IF NOT EXISTS eventnote
  (
      id uuid NOT NULL,
      "userId" uuid NOT NULL,
      "contentText" text COLLATE pg_catalog."default",
      "contentHtml" text COLLATE pg_catalog."default",
      "createdTime" timestamp without time zone,
      "updatedTime" timestamp without time zone,
      CONSTRAINT eventnote_pkey PRIMARY KEY (id)
  )`
  try {
    await pool.query(eventNoteCreateQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Drop User Table
 */
const dropUserTable = async (isEnd = false) => {
  console.log('====dropUserTable====')
  const usersDropQuery = `DROP TABLE IF EXISTS users`
  try {
    await pool.query(usersDropQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}


/**
 * Drop Resource Table
 */
const dropResourceTable = async (isEnd = false) => {
  console.log('====dropResourceTable====')
  const resourceDropQuery = `DROP TABLE IF EXISTS resource`
  try {
    await pool.query(resourceDropQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Drop Google account Table
 */
const dropGoogleAccount = async (isEnd = false) => {
  console.log('====dropGoogleAccount====')
  const googleAccountDropQuery = `DROP TABLE IF EXISTS googleaccount`
  try {
    await pool.query(googleAccountDropQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

/**
 * Drop Bus Table
 */
const dropEventNoteingTable = async (isEnd = false) => {
  console.log('====dropEventNoteingTable====')
  const eventNoteDropQuery = `DROP TABLE IF EXISTS eventnote`
  try {
    await pool.query(eventNoteDropQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

const createReferenceKey = async (isEnd = false) => {
  console.log('====createReferenceKey====')
  const createReferenceKeyQuery = `ALTER TABLE resource ADD CONSTRAINT fkey_resource_event_note FOREIGN KEY ("eventId")
    REFERENCES eventnote (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ALTER TABLE resource ADD CONSTRAINT fkey_resource_google_account FOREIGN KEY ("accountId")
    REFERENCES googleaccount (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ALTER TABLE resource ADD CONSTRAINT fkey_resource_user FOREIGN KEY ("userId")
    REFERENCES "users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ALTER TABLE googleaccount ADD CONSTRAINT fkey_google_account_user FOREIGN KEY ("userId")
    REFERENCES "users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
  ALTER TABLE eventnote ADD CONSTRAINT eventnote_user_fkey FOREIGN KEY ("userId")
    REFERENCES "users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,`
  try {
    await pool.query(createReferenceKeyQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}

const dropReferenceKey = async (isEnd = false) => {
  console.log('====dropReferenceKey====')
  const createReferenceKeyQuery = `ALTER TABLE resource DROP CONSTRAINT IF EXISTS fkey_resource_event_note,
  ALTER TABLE resource DROP CONSTRAINT IF EXISTS fkey_resource_google_account,
  ALTER TABLE resource DROP CONSTRAINT IF EXISTS fkey_resource_user,
  ALTER TABLE googleaccount DROP CONSTRAINT IF EXISTS fkey_google_account_user,
  ALTER TABLE eventnote DROP CONSTRAINT IF EXISTS eventnote_user_fkey,`
  try {
    await pool.query(createReferenceKeyQuery)
    console.log('success - isEnd', isEnd)
    isEnd && pool.end()
  } catch (error) {
    console.log('isEnd', isEnd)
    isEnd && pool.end()
  }
}


/**
 * Create All Tables
 */
export const createAllTables = async () => {
  await createUserTable()
  await createResourceTable()
  await createGoogleAccountTable()
  await createEventNoteTable(true)
  // await createReferenceKey(true)
}


/**
 * Drop All Tables
 */
export const dropAllTables = async () => {
  // await dropReferenceKey()
  await dropUserTable()
  await dropResourceTable()
  await dropGoogleAccount()
  await dropEventNoteingTable(true)
}

pool.on('remove', () => {
  console.log('client removed')
  process.exit(0)
})

require('make-runnable')