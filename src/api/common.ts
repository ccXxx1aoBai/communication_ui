import request from '@/utils/request'

export const login = (data : any) : any => {
  return request.post('/login', data)
}

export const getRoute = (data : any) : any => {
  return request.post('/routes', data)
}