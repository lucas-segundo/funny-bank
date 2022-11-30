import { SessionGetter } from '.'

export const mockSessionGetter = (): jest.Mocked<SessionGetter> => ({
  get: jest.fn(),
})
