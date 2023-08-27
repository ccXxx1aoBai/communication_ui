import request from '@/utils/request'

export const getUserList = (data: any) : any => {
  return request.post('/user/get', data)
}

export const bannedUser = (data: any) : any => {
  return request.post('/user/banned', data)
}

export const enableUser = (data: any) : any => {
  return request.post('/user/enable', data)
}

export const changeAvatar = (data: any) : any => {
  return request.post('/user/avatar', data)
}

export const getInfo = (data?: any) : any => {
  return request.post('/user/info', data)
}

export const changeInfo = (data: any) : any => {
  return request.post('/user/info/update', data)
}

export const changePassword = (data: any) : any => {
  return request.post('/user/info/password', data)
}