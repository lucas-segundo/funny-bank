import { faker } from '@faker-js/faker'
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios'
import { HttpStatusCodeEnum } from 'app/protocols/http/http-status-code-enum'
import { AxiosClient } from '.'
import { makeFakeHttpParams } from './mock'

jest.mock('axios')

const mockResolvedAxiosRequest = (
  fakeResponseData = {
    [faker.random.word()]: faker.random.words(),
  }
) => {
  const axiosMocked = axios as jest.Mocked<typeof axios>

  axiosMocked.request.mockResolvedValueOnce({
    data: fakeResponseData,
    status: 200,
  })
}

const makeSut = (url = faker.internet.url()) => {
  const sut = new AxiosClient(url)
  const axiosMocked = axios as jest.Mocked<typeof axios>
  const fakeParams = makeFakeHttpParams()

  return {
    sut,
    fakeParams,
    axiosMocked,
  }
}

describe('AxiosClient', () => {
  it('should call axios with correct params', async () => {
    const url = faker.internet.url()
    const { sut, fakeParams } = makeSut(url)
    mockResolvedAxiosRequest()

    const axiosConfig: AxiosRequestConfig = {
      url,
      method: fakeParams.method,
      data: fakeParams.body,
      headers: fakeParams.headers as RawAxiosRequestHeaders,
    }

    await sut.request(fakeParams)
    expect(axios.request).toHaveBeenCalledWith(axiosConfig)
  })

  it('should returns data on success', async () => {
    const { sut, fakeParams } = makeSut()
    const fakeResponseData = {
      [faker.random.word()]: faker.random.words(),
    }

    mockResolvedAxiosRequest(fakeResponseData)

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: fakeResponseData,
      statusCode: HttpStatusCodeEnum.OK,
    })
  })

  it('should throw a axios error when request fail', async () => {
    const { sut, fakeParams, axiosMocked } = makeSut()
    const httpResponse = {
      data: faker.datatype.json(),
      status: faker.internet.httpStatusCode(),
    }

    axiosMocked.request.mockRejectedValueOnce({
      response: httpResponse,
    })

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: httpResponse.data,
      statusCode: httpResponse.status,
    })
  })

  it('should throw a unknow error when something fails', async () => {
    const { sut, fakeParams, axiosMocked } = makeSut()

    axiosMocked.request.mockRejectedValueOnce(new Error())

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: new Error(),
      statusCode: HttpStatusCodeEnum.SERVER_ERROR,
    })
  })
})
