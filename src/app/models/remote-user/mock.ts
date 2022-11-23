import { faker } from '@faker-js/faker'
import { RemoteUser } from '.'

export const mockRemoteUser = (): RemoteUser => ({
  jwt: faker.datatype.uuid(),
  user: {
    id: faker.datatype.number(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    provider: faker.random.word(),
    blocked: faker.datatype.boolean(),
    confirmed: faker.datatype.boolean(),
    createdAt: faker.datatype.datetime().toDateString(),
    updatedAt: faker.datatype.datetime().toDateString(),
  },
})
