import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  DatabaseSetterClient,
  DatabaseSetterClientParams,
} from 'app/protocols/database/database-setter-client'

export class AsyncStorageClient implements DatabaseSetterClient {
  async set<Data>({
    into,
    data,
  }: DatabaseSetterClientParams<Data>): Promise<void> {
    const dataStringified = JSON.stringify(data)
    await AsyncStorage.setItem(into, dataStringified)
  }
}
