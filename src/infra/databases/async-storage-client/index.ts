import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DatabaseGetterClient,
  DatabaseGetterClientParams,
} from 'app/protocols/database/database-getter-client'
import {
  DatabaseSetterClient,
  DatabaseSetterClientParams,
} from 'app/protocols/database/database-setter-client'

export class AsyncStorageClient
  implements DatabaseSetterClient, DatabaseGetterClient
{
  async get<Data>({
    from,
  }: DatabaseGetterClientParams): Promise<Data | undefined> {
    const stringData = await AsyncStorage.getItem(from)

    if (stringData) {
      return JSON.parse(stringData)
    }
  }

  async set<Data>({
    into,
    data,
  }: DatabaseSetterClientParams<Data>): Promise<void> {
    const dataStringified = JSON.stringify(data)
    await AsyncStorage.setItem(into, dataStringified)
  }
}
