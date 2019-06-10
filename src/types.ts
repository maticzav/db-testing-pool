export interface PoolDefinition {
  endpoint: string
  pool: {
    min?: number
    max: number
  }
  auth?: { token: string }
  mock?: Faker
}
