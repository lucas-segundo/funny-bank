import { RemoteUserAuthentication } from 'app/use-cases/remote-user-authentication'
import { AxiosClient } from 'infra/http/axios'
import { ENV_VAR } from 'main/config/env-var'

export const makeUserAuthentication = () => {
  const apiRestClient = new AxiosClient(ENV_VAR.CMS_URL + '/api/auth/local')

  return new RemoteUserAuthentication(apiRestClient)
}
