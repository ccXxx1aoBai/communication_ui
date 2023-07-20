import AesUtil from "@/utils/AesUtil"

export default {
  token: (state : any) => AesUtil.decrypt(state.user.token),
  id: (state : any) => AesUtil.decrypt(state.user.id),
  username: (state : any) => AesUtil.decrypt(state.user.username),
  nickname: (state : any) => AesUtil.decrypt(state.user.nickname),
  role: (state : any) => AesUtil.decrypt(state.user.role),
  roleName: (state : any) => AesUtil.decrypt(state.user.roleName),
  avatar: (state : any) => AesUtil.decrypt(state.user.avatar),
  phone: (state : any) => AesUtil.decrypt(state.user.phone),
  routes: (state : any) => state.user.routes,
}