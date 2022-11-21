import { faker } from '@faker-js/faker'
import { User } from '.'

export const mockUser = (): User => ({
  id: faker.datatype.uuid(),
  fullName: faker.name.fullName(),
  username: faker.internet.userName(),
})
