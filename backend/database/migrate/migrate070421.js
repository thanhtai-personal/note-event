module.exports = async (pool, isEnd = false) => {
  console.log('migrate 07-04-2021 start')
  const addColumnRoleIdToUser = `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "roleId" uuid;`
  const createUserRoleReferenceKeyQuery = `ALTER TABLE "user"
    DROP CONSTRAINT IF EXISTS fkey_user_role,
    ADD CONSTRAINT fkey_user_role FOREIGN KEY ("roleId")
    REFERENCES "role" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;`
  const createDefaultSuperAdminRole = `INSERT INTO "role"(id, name) VALUES ('00ca3cae-97b1-11eb-a8b3-0242ac130003', 'superadmin')
    ON CONFLICT DO NOTHING;`
  const createDefaultGuessRole = `INSERT INTO "role"(id, name) VALUES ('65b68b6b-8c50-48d7-84fd-11998eae02b6', 'guess')
    ON CONFLICT DO NOTHING;`
  const createDefaultSuperAdminUser = `INSERT INTO "user"(id, username, password, "roleId") VALUES 
    ('faf8723f-bc1d-45b1-817d-9f373c9ca1da', 'superadmin', 'Hp+9;aeg*=ux;]y', '00ca3cae-97b1-11eb-a8b3-0242ac130003') 
    ON CONFLICT DO NOTHING;`

  try {
    await pool.query(addColumnRoleIdToUser)
    await pool.query(createUserRoleReferenceKeyQuery)
    await pool.query(createDefaultGuessRole)
    await pool.query(createDefaultSuperAdminRole)
    await pool.query(createDefaultSuperAdminUser)
    console.log('querry success')
    isEnd && pool.end()
  } catch (error) {
    console.log('query error', error)
    isEnd && pool.end()
  }
}