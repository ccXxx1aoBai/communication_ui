import request from '@/utils/request'

export const publishVersion = (data: any) : any => {
  return request.post('/upgrade/publish', data)
}

export const getData = (data: any) : any => {
  return request.post('/upgrade/list', data)
}

export const versionRollback = (data: any) : any => {
  return request.post('/upgrade/rollback')
}

export const removeVersion = (data: any) : any => {
  return request.post('/upgrade/remove')
}