import { AsyncStorageClient } from '.'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { mockDatabaseSetterClientParams } from 'app/protocols/database/database-setter-client/mock'
import { faker } from '@faker-js/faker'
import { mockDatabaseGetterClientParams } from 'app/protocols/database/database-getter-client/mock'

jest.mock('@react-native-async-storage/async-storage')

const makeSut = () => {
  const asyncStorageSetItem = jest.spyOn(AsyncStorage, 'setItem')
  const asyncStorageGetItem = jest.spyOn(AsyncStorage, 'getItem')
  const sut = new AsyncStorageClient()

  return {
    sut,
    asyncStorageSetItem,
    asyncStorageGetItem,
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

  it('should throw error if something whong happens in setItem', async () => {
    const { sut, asyncStorageSetItem } = makeSut()
    asyncStorageSetItem.mockRejectedValueOnce(Error)

    const setParams = mockDatabaseSetterClientParams()
    const result = sut.set(setParams)

    expect(result).rejects.toThrow(Error)
  })

  it('should call getItem with right params', async () => {
    const { sut, asyncStorageGetItem } = makeSut()

    const getParams = mockDatabaseGetterClientParams()
    await sut.get({
      from: getParams.from,
    })

    expect(asyncStorageGetItem).toBeCalledWith(getParams.from)
  })
})
