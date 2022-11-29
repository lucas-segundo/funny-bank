export type DatabaseSetterClientParams<Data> = {
  into: string
  data: Data
}

export interface DatabaseSetterClient {
  set<Data>(params: DatabaseSetterClientParams<Data>): Promise<void>
}
