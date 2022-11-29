import { mockUser } from 'domain/models/user/mock'
import { SessionSetter, SessionSetterParams } from '.'

export const mockSessionSetterParams = (): SessionSetterParams => ({
  user: mockUser(),
})

export const mockSessionSetter = (): jest.Mocked<SessionSetter> => ({
  set: jest.fn(),
})
