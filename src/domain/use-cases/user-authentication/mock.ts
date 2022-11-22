import { faker } from '@faker-js/faker'
import { UserAuthentication, UserAuthenticationParams } from '.'

export const mockUserAuthenticationParams = (): UserAuthenticationParams => ({
  identifier: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockUserAuthentication = (): jest.Mocked<UserAuthentication> => ({
  auth: jest.fn(),
})
