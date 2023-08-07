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
}