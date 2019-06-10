import { Pool } from '../src/pool'

// #1
/**
 * Create wrappers for Jest functions
 *
 * Pros: We can pass Photon instance inside the test, automatic resource management out-of-the-box.
 * Cons: Might be more complex, we are wrapping Jest functions, very rigid.
 */
const { beforeAll, test, describe } = new Pool({
  endpoint: 'http://localhost:4466',
  pool: {
    max: 5,
  },
})

describe('something important', { clean: 'per-test' | 'per-block' }, () => {
  /**
   * Photon is automatically instantiated before the test,
   * and the database is automatically released after the test.
   */
  test('adds 1 + 2 to equal 3', async photon => {
    const user = await photon.createUser({
      name: 'Matic',
    })

    expect(user).toEqual({ name: 'Matic' })
  })
})

// #2
/**
 * Manual pool.
 *
 * Pros: More managable, less abstract.
 * Cons: Lots of manual work, global db instances. Possible need to use `globalTeardown/globalSetup`
 *  to have the same db used in multiple tests (make pool global variable).
 */

describe('test Prisma', () => {
  let dbs: Pool

  beforeAll(() => {
    dbs = new Pool({
      endpoint: 'http://localhost:4466',
      pool: {
        max: 5,
      },
      mock: bag => ({
        User: {
          amount: 10,
          factory: {
            name: bag.name,
          },
        },
      }),
    })
  })

  afterAll(async () => {
    await dbs.drain()
  })

  /**
   * New instance per-test.
   */
  test('adds user correctly', async () => {
    const photon = await dbs.getDBInstance({ populated: true })

    const user = await photon.createUser({
      name: 'Matic',
    })

    expect(user).toEqual({ name: 'Matic' })
  })
})
