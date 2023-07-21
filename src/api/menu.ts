import request from '@/utils/request'

export const getMenu = (data : any) : any => {
  return request.post('/menu/get', data)
}