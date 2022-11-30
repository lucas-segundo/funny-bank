import { faker } from '@faker-js/faker'
import { DatabaseGetterClient, DatabaseGetterClientParams } from '.'

export const mockDatabaseGetterClientParams =
  (): DatabaseGetterClientParams => ({
    from: faker.database.column(),
  })

export const mockDatabaseGetterClient =
  (): jest.Mocked<DatabaseGetterClient> => ({
    get: jest.fn(),
  })
