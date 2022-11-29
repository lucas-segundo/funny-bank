import { DatabaseSetterClient } from '.'

export const mockDatabaseSetterClient =
  (): jest.Mocked<DatabaseSetterClient> => ({
    set: jest.fn(),
  })
