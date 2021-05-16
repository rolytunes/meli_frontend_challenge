import Axios from 'axios'
import {Config} from '../config/index'

const HttpClient = {
  getHeaders: () => {
    const headers: any = {
      'Access-Control-Allow-Origin': '*',
    }
    return headers
  },

  getData: (data: any) => {
    let param: any = {}
    param = {
        ...data,
      }
    return param
  },

  validateStatus: (status: number) => {
    const unauthorized = 401
    if (status == unauthorized) {
      HttpClient.redirectBase()
    }
    return status >= 200 && status < 300
  },

  redirectBase: (): void => {
    window.location.href = Config.BASE_URL
  },

  get: (
    pathRelative: string,
    data: any,
    success?: any,
    error?: any,
    always?: any,
    login = true
  ) => {
    const CancelToken = Axios.CancelToken
    const source = CancelToken.source()

    return Axios.get(Config.END_POINT + pathRelative, {
      params: HttpClient.getData(data),
      cancelToken: source.token,
      headers: HttpClient.getHeaders(),
      validateStatus: (status) => {
        return HttpClient.validateStatus(status)
      },
    })
      .then(function (response) {
        if (success) {
          success(response)
        }
      })
      .catch(function (errors) {
        if (errors.response && error) {
          error(errors)
        }
      })
      .then(function () {
        if (always) {
          always()
        }
      })
  },

  /* getExternal: (
    path: string,
    data: any,
    success?: any,
    error?: any,
    always?: any,
    login = true
  ) => {
    const CancelToken = Axios.CancelToken
    const source = CancelToken.source()

    return Axios.get(path, {
      params: HttpClient.getData(data),
      cancelToken: source.token,
      headers: HttpClient.getHeaders(),
      validateStatus: (status) => {
        return HttpClient.validateStatus(status)
      },
    })
      .then(function (response) {
        if (success) {
          success(response)
        }
      })
      .catch(function (errors) {
        if (errors.response && error) {
          error(errors)
        }
      })
      .then(function () {
        if (always) {
          always()
        }
      })
  }, */
}
export default HttpClient
