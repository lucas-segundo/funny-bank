export type ApiRestClientParams<Body> = {
  method: 'get' | 'post'
  headers?: Record<string, unknown>
  body?: Body
}

export type ApiRestClientResponse<Data> = {
  data: Data
  statusCode: number
}

export interface ApiRestClient {
  request<Body, Data>(
    params: ApiRestClientParams<Body>
  ): Promise<ApiRestClientResponse<Data>>
}
