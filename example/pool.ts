import { Pool } from '../src/pool'

describe('test Prisma', () => {
  let dbs: Pool

  beforeAll(() => {
    dbs = new Pool({
      datamodel: '',
      pool: {
        max: 5,
      },
    })
  })

  afterAll(async () => {
    await dbs.drain()
  })

  // test('adds user correctly', async () => {
  //   const instnace = await dbs.getDBInstance()
  //   const photon = new Photon(instnace)

  //   const user = await photon.createUser({
  //     name: 'Matic',
  //   })

  //   expect(user).toEqual({ name: 'Matic' })
  // })
})
