import { AsyncStorageClient } from '.'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mockDatabaseSetterClientParams } from 'app/protocols/database/database-setter-client/mock'

jest.mock('@react-native-async-storage/async-storage')

const makeSut = () => {
  const asyncStorageSetItem = jest.spyOn(AsyncStorage, 'setItem')
  const sut = new AsyncStorageClient()

  return {
    sut,
    asyncStorageSetItem,
  }
}

describe('AsyncStorageClient', () => {
  it('should call setItem with right params', async () => {
    const { asyncStorageSetItem, sut } = makeSut()

    const setParams = mockDatabaseSetterClientParams()
    await sut.set(setParams)

    const dataStringified = JSON.stringify(setParams.data)

    expect(asyncStorageSetItem).toBeCalledWith(setParams.into, dataStringified)
  })

  it('should return nothing when set is called', async () => {
    const { sut } = makeSut()

    const setParams = mockDatabaseSetterClientParams()
    const result = await sut.set(setParams)

    expect(result).toBeUndefined()
  })
})
