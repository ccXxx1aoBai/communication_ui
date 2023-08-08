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