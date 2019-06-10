import { PoolDefinition } from './types'

export class Pool {
  private endpoint: string
  private dbs: {
    available: any[]
    busy: any[]
  }
  private faker: any
  private pool: { min: number; max: number }

  constructor(definition: PoolDefinition) {}

  /**
   * Returns a Photon instance from the pool once made available, and cleans
   * and populates the instance if necessary.
   *
   * The returned Photon instance includes the db identifier used for
   * the database releasing.
   *
   * @param opts
   */
  getDBInstance(opts: {
    populated?: boolean
    timeout?: number
  }): Promise<Photon> {
    /**
     * Check whether any of the instances is available and creates a new one
     * if the pool limit is not yet reached, otherwise waits for the available
     * instance.
     *
     * The returned Photon instance is wrapped in a debouncer which releases the database
     * after an instance hasn't been active for a certain period of time.
     */
    return {} as any
  }

  /**
   * Makes the instance available.
   */
  releaseDBInstance(db: Photon): void {
    /**
     * Cleans up the instance for future use.
     */
  }

  /**
   * Drains the pool by deleting all instances.
   */
  drain(): void {}
}
