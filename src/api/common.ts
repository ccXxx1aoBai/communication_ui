import request from '@/utils/request'
import store from '@/store'
import axios, { AxiosProgressEvent } from 'axios'

export const login = (data : any) : any => {
  return request.post('/login', data)
}

export const getRoute = (data? : any) : any => {
  return request.post('/routes', data)
}

export const getLog = (data?: any) : any => {
  return request.post('/log', data)
}

export const getSystemInfo = () : any => {
  return request.post('/sys')
}

export const uploadFile = (file : File, type: string, callback?: Function) : any => {
  return axios({
    url: '/upload',
    baseURL: import.meta.env.VITE_BASE_URL,
    method: 'post',
    data: {
      file,
      type
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': store.getters.token
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      callback && callback(progressEvent)
    },
  })
}