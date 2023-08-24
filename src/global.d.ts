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
    id: String,
    user: String,
    ip: String,
    method: String,
    args: String,
    agent: String,
    opType: String,
    description: String,
    longTime: String | Number,
    createTime: String,
  }

  interface Article {
    id: String,
    authorId: String,
    author: String,
    content?: String,
    resource?: String | String[],
    type: String | Number,
    status: String | Number,
    createTime: String,
    publishTime?: String
  }

  interface Feedback {
    id: String,
    user: String,
    type: String,
    status: String,
    content?: String,
    imgs?: String | String[],
    createTime: String,
    replyTime?: String,
    resolveTime?: String
  }

  interface User {
    id: String,
    username: String,
    password?: String,
    phone?: String,
    openId?: String,
    role?: String,
    createTime: String,
    nickname: String,
    avatar: String,
    sex?: Number,
    birth?: String
  }

  interface Message {
    body: {
      type: Number,
      content?: String
    },
    sendBy: {
      id: String,
      username?: String,
      avatar?: String
    },
    reception: {
      id: String,
      username?: String,
      avatar?: String
    }
  }

  interface Permission {
    id: String,
    name: String,
    label: String,
    menus: String,
    menuLabel?: String
  }

  interface Upgrade {
    id?: String | Number,
    version: String,
    versionCode: Number | String,
    platform: String,
    force: boolean,
    description: String,
    createTime?: String
  }
}