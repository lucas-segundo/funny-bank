import { faker } from '@faker-js/faker'
import { ApiRestClientParams } from 'app/protocols/http/api-rest-client'

export const makeFakeHttpParams = (): ApiRestClientParams<unknown> => ({
  body: {
    [faker.random.word()]: faker.random.words(),
  },
  headers: {
    [faker.database.column()]: faker.random.word(),
  },
  method: 'get',
})
