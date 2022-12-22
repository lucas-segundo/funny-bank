import { LocalSessionSetter } from 'app/use-cases/local-session-setter'
import { AsyncStorageClient } from 'infra/databases/async-storage-client'

export const makeSessionSetter = () => {
  const database = new AsyncStorageClient()

  return new LocalSessionSetter(database)
}
