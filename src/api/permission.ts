import request from '@/utils/request'

export const getData = (data : any) : any => {
  return request.post('/permission/get', data)
}

export const addRole = (data : any) : any => {
  return request.post('/permission/add', data)
}

export const updateRole = (data : any) : any => {
  return request.post('/permission/update', data)
}

export const removeRole = (data : any) : any => {
  return request.post('/permission/remove', data)
}