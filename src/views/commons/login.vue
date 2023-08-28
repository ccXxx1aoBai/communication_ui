<template>
  <div>
    <div class="page">
      <div class="login-panel">
        <div class="p-l">
          <img src="@/assets/images/login_bg.png">
        </div>
        <div class="form">
          <div class="form-title">管理后台登录</div>
          <div class="form-subtitle">如未开通账户请先联系管理员或网站负责人</div>
          <el-form :model="form" :rules="rules" ref="refForm">
            <el-form-item prop="username">
              <el-input v-model="form.username" clearable placeholder="请输入账号" maxlength="20">
                <template #prefix>
                  <el-icon color="#CBB1FC">
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" show-password clearable placeholder="请输入登陆密码"
                maxlength="20">
                <template #prefix>
                  <el-icon color="#CBB1FC">
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="form-footer">
            <el-button type="primary" round style="width: 100%;" @click="handleLogin()">登陆</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { reactive, ref } from "vue";
import { FormInstance } from 'element-plus';
import { login } from '@/api/common';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive({
  username: [
    { required: true, message: '请输入账号' }
  ],
  password: [
    { required: true, message: '请输入登陆密码' }
  ]
})

const refForm = ref<FormInstance>();
const store = useStore();
const router = useRouter()
const handleLogin = async () => {
  await refForm.value?.validate(async (valid: boolean) => {
    if (valid) {
      await login(form).then((res: Res) => {
        if (res.code === 200) {
          store.dispatch('getUserInfo')
          router?.push('/index')
        }
      })
    }
  })
}
</script>
  
<style lang="scss" scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/login_bg_mask.png');
  background-repeat: no-repeat;
  background-size: 1792px 1253px;
  background-position: 630px -231px;

  .login-panel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    background-color: #ffffff;
    box-shadow: 0 0 40px #CBB1FC;
    border-radius: 24px;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(-25%, 25%);
      display: block;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background-color: #F7F1FF;
      z-index: -1;
    }
  }

  .p-l {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 600px;
      padding: 60px 30px;
      box-sizing: border-box;

    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 400px;
    padding: 10px 20px;
    box-sizing: border-box;
    padding-right: 50px;

    &-title {
      margin-top: 100px;
      font-size: 46px;
      font-weight: 600;
      line-height: 56px;
      vertical-align: top;
      text-align: right;
    }

    &-subtitle {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: #C9CDD4;
      text-align: right;
      vertical-align: top;
    }


    .el-form {
      width: 350px;
      margin-top: 60px;
    }

    &:deep(.el-input__wrapper) {
      border-radius: 20px;
      background-color: rgba($color: #ECDEFF, $alpha: .3);
      box-shadow: unset;

      &:focus {
        box-shadow: unset;
      }
    }

    .el-icon {
      border: 1px dashed #CBB1FC;
      padding: 2px;
    }

    &-footer {
      width: 350px;
      margin-top: 40px;
    }
  }
}</style>