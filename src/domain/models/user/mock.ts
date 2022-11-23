import { faker } from '@faker-js/faker'
import { User } from '.'

export const mockUser = (): User => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  accessToken: faker.datatype.uuid(),
})
