import request from '@/utils/request'
import { AxiosProgressEvent } from 'axios'

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
  return request.post('/upload', {
    file,
    type
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      console.log('progressEvent: ', progressEvent);
      callback && callback(progressEvent)
    },
  })
}