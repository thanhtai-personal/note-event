module.exports = async (pool, isEnd = false) => {
  console.log('migrate 07-04-2021 start')
  const addColumnRoleIdToUser = `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "roleId" uuid;`
  const createUserRoleReferenceKeyQuery = `ALTER TABLE "user" ADD CONSTRAINT fkey_user_role FOREIGN KEY ("roleId")
    REFERENCES "role" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION`
  const createDefaultSuperAdminRole = `INSERT INTO "role"(id, name) VALUES ('00ca3cae-97b1-11eb-a8b3-0242ac130003', 'superadmin');`
  const createDefaultSuperAdminUser = `INSERT INTO "user"(id, username, password, "roleId") VALUES ('faf8723f-bc1d-45b1-817d-9f373c9ca1da', 'superadmin', 'Hp+9;aeg*=ux;]y', '00ca3cae-97b1-11eb-a8b3-0242ac130003');`

  try {
    await pool.query(addColumnRoleIdToUser)
    await pool.query(createUserRoleReferenceKeyQuery)
    await pool.query(createDefaultSuperAdminRole)
    await pool.query(createDefaultSuperAdminUser)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}