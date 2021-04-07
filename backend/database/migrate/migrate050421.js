module.exports = async (pool, isEnd = false) => {
  console.log('migrate 05-04-2021 start')
  const createRoleTableQuery = `CREATE TABLE IF NOT EXISTS "role"
  (
      id uuid NOT NULL,
      name text COLLATE pg_catalog."default" NOT NULL,
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" uuid,
      "createdBy" uuid,
      "isActive" boolean DEFAULT true,
      CONSTRAINT role_pkey PRIMARY KEY (id)
  )`
  const createPermissionTableQuery = `CREATE TABLE IF NOT EXISTS "permission"
  (
      id uuid NOT NULL,
      name text COLLATE pg_catalog."default" NOT NULL,
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" uuid,
      "createdBy" uuid,
      "isActive" boolean DEFAULT true,
      CONSTRAINT permission_pkey PRIMARY KEY (id)
  )`

  const createRolePermissionTableQuery = `CREATE TABLE IF NOT EXISTS "role_permission"
  (
      id uuid NOT NULL,
      "roleId" uuid,
      "permisisonId" uuid,
      "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
      "updatedBy" uuid,
      "createdBy" uuid,
      "isActive" boolean DEFAULT true,
      CONSTRAINT role_permission_pkey PRIMARY KEY (id),
      CONSTRAINT fkey_role_permission_role FOREIGN KEY ("roleId")
        REFERENCES "role" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
      CONSTRAINT fkey_role_permission_permission FOREIGN KEY ("permisisonId")
        REFERENCES "permission" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
  )`

  try {
    await pool.query(createRoleTableQuery)
    await pool.query(createPermissionTableQuery)
    await pool.query(createRolePermissionTableQuery)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}