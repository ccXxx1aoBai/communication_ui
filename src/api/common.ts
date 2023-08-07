import request from '@/utils/request'

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