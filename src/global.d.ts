import { DefineComponent } from "vue";

declare global {
  interface Res {
    code: number,
    data?: any,
    msg?: string
  }
  
  interface Menus {
    id: number | string,
    label: string,
    name?: string,
    component?: Promise,
    path?: string | null,
    icon?: string | null,
    parent?: number | string,
    children?: Menus[] | null,
    sort: number,
    meta?: {
      title?: string
    }
  }

  interface Log {
    id: string,
    user: string,
    ip: string,
    method: string,
    args: string,
    agent: string,
    opType: string,
    description: string,
    longTime: string | number,
    createTime: string,
  }

  interface Article {
    id: string,
    authorId: string,
    author: string,
    content?: string,
    resource?: string | string[],
    type: string | number,
    status: string | number,
    createTime: string,
    publishTime?: string
  }

  interface Feedback {
    id: string,
    user: string,
    type: string,
    status: string,
    content?: string,
    imgs?: string | string[],
    createTime: string,
    replyTime?: string,
    resolveTime?: string
  }

  interface User {
    id: string,
    username: string,
    password?: string,
    phone?: string,
    openId?: string,
    role?: string,
    roleName?: string,
    createTime?: string,
    nickname: string,
    avatar: string,
    sex?: number | string,
    birth?: string,
    email?: string,
    roleLabel?: string
  }

  interface Message {
    body: {
      type: number,
      content?: string
    },
    sendBy: {
      id: string,
      username?: string,
      avatar?: string
    },
    reception: {
      id: string,
      username?: string,
      avatar?: string
    }
  }

  interface Permission {
    id: string,
    name: string,
    label: string,
    menus: string,
    menuLabel?: string
  }

  interface Upgrade {
    id?: string | number,
    version: string,
    versionCode: number | string,
    platform: string,
    forceUpdate: boolean | number,
    description: string,
    createTime?: string,
    source?: string,
    current?: boolean
  }
}