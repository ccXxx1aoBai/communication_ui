import request from '@/utils/request'

export const getMenu = (data : any) : any => {
  return request.post('/menu/get', data)
}

export const getAllMenu = () : any => {
  return request.post('/menu/all')
}

export const addMenu = (data : any) : any => {
  return request.post('/menu/add', data)
}

export const updateMenu = (data : any) : any => {
  return request.post('/menu/update', data)
}

export const removeMenu = (data : any) : any => {
  return request.post('/menu/remove', data);
}