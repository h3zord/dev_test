import { AppDataSource } from '../../data-source'

export async function resetDatabase() {
  try {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;')

    const entities = AppDataSource.entityMetadatas

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name)

      await repository.clear()
    }

    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;')

    console.log('[TEST DATABASE]: Clean')
  } catch (error) {
    throw new Error(`ERROR: Cleaning test database: ${error}`)
  }
}
