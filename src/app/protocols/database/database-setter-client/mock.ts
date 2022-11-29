import { faker } from '@faker-js/faker'
import { DatabaseSetterClient, DatabaseSetterClientParams } from '.'

export const mockDatabaseSetterClientParams =
  (): DatabaseSetterClientParams<unknown> => ({
    into: faker.database.column(),
    data: faker.datatype.json(),
  })

export const mockDatabaseSetterClient =
  (): jest.Mocked<DatabaseSetterClient> => ({
    set: jest.fn(),
  })
