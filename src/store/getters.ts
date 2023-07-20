export default {
  token: (state : any) => state.user.token,
  id: (state : any) => state.user.id,
  username: (state : any) => state.user.username,
  nickname: (state : any) => state.user.nickname,
  role: (state : any) => state.user.role,
  roleName: (state : any) => state.user.roleName,
  avatar: (state : any) => state.user.avatar,
  phone: (state : any) => state.user.phone,
  routes: (state : any) => state.tools.routes,
}