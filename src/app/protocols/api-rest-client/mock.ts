import { ApiRestClient } from '.'

export const mockApiRestClient = (): jest.Mocked<ApiRestClient> => ({
  request: jest.fn(),
})
