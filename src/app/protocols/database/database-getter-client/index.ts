export type DatabaseGetterClientParams = {
  from: string
}

export interface DatabaseGetterClient {
  get<Data>(params: DatabaseGetterClientParams): Promise<Data>
}
