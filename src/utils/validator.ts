import { FormRules } from "element-plus";

export const phoneValidator = (rule: FormRules, val: string, callback: Function) => {
  const reg = /^1[3456789]\d{9}/$
  if((val ?? '') == '') {
    callback(new Error('手机号码不能为空'))
  }else {
    if(reg.test(val)) {
      callback()
    }else {
      callback(new Error('手机号码格式错误'))
    }
  }
}

export const passwordValidator = (rule: FormRules, val: string, callback: Function) => {
  const reg = /[a-zA-Z]|\d|_*.*/g
  if((val ?? '') == '') {
    callback(new Error('密码不能为空'))
  }else if()
}