export const phoneValidator = (rule: any, val: string, callback: any) => {
  const reg = /^1[3456789]\d{9}$/
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

export const phoneRules = (rule: any, val: string, callback: any) => {
  const reg = /^1[3456789]\d{9}$/
  if((val ?? '') != '') {
    if(reg.test(val)) {
      callback()
    }else {
      callback(new Error('手机号码格式错误'))
    }
  }
}

export const passwordValidator = (rule: any, val: string, callback: any) => {
  const reg = /([a-zA-Z0-9@$!%*?&^#~.]{6,20})/g
  if((val ?? '') == '') {
    callback(new Error('密码不能为空'))
  }else {
    if((reg.test(val))) {
      callback()
    }else {
      callback(new Error('密码6到20个字符，包括英文字母数字及@$!%*?&^#~./特殊字符'))
    }
  }
}