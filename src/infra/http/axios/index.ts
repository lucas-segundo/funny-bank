import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from 'axios'
import { HttpStatusCodeEnum } from 'app/protocols/http/http-status-code-enum'
import {
  ApiRestClient,
  ApiRestClientParams,
} from 'app/protocols/http/api-rest-client'

export class AxiosClient implements ApiRestClient {
  constructor(private readonly url: string) {}

  async request<Body>(params: ApiRestClientParams<Body>) {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: this.url,
        method: params.method,
        headers: params.headers as RawAxiosRequestHeaders,
        data: params.body,
      })
    } catch (error) {
      const axiosError = error as AxiosError | undefined
      if (axiosError?.response) {
        axiosResponse = axiosError.response
      } else {
        return {
          data: error as Error,
          statusCode: HttpStatusCodeEnum.SERVER_ERROR,
        }
      }
    }

    return {
      data: axiosResponse.data,
      statusCode: axiosResponse.status,
    }
  }
}
