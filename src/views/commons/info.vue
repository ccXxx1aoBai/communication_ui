<template>
  <div class="container">
    <div style="flex: 0 0 400px">
      <el-card header="个人信息">
        <div class="info-card">
          <div
            class="avatar"
            @mouseenter="mask = true"
            @mouseleave="mask = false"
            @click="dialog = true">
            <img :src="avatar" class="avatar-img" />
            <div class="mask" :class="mask ? 'show' : ''">
              <el-icon :size="24" color="#f1f1f1">
                <EditPen />
              </el-icon>
            </div>
          </div>
          <div class="info-item">
            <div class="label-cell">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>用户名称</span>
            </div>
            <div class="value-cell">{{ user?.username }}</div>
          </div>
          <div class="info-item">
            <div class="label-cell">
              <el-icon>
                <Phone />
              </el-icon>
              <span>手机号码</span>
            </div>
            <div class="value-cell">{{ user?.phone }}</div>
          </div>
          <div class="info-item">
            <div class="label-cell">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>用户邮箱</span>
            </div>
            <div class="value-cell">{{ user?.email }}</div>
          </div>
          <div class="info-item">
            <div class="label-cell">
              <el-icon>
                <Avatar />
              </el-icon>
              <span>用户角色</span>
            </div>
            <div class="value-cell">{{ user?.roleLabel }}</div>
          </div>
          <div class="info-item">
            <div class="label-cell">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>创建时间</span>
            </div>
            <div class="value-cell">{{ user?.createTime }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="panel">
      <el-card header="基本资料">
        <el-tabs v-model="activeTab">
          <el-tab-pane name="info">
            <template #label>
              <div style="display: flex; align-items: center">
                <el-icon><EditPen /></el-icon>
                <span style="margin-left: 6px">基本资料</span>
              </div>
            </template>
            <div class="form">
              <el-form
                :model="form"
                :rules="rules"
                ref="formRef"
                label-width="100px">
                <el-form-item prop="nickname" label="用户昵称：">
                  <el-input
                    v-model="form.nickname"
                    clearable
                    placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号码：">
                  <el-input
                    v-model="form.phone"
                    clearable
                    disabled
                    placeholder="手机号码"
                    maxlength="11">
                  <template #suffix>
                    <el-button type="text">修改</el-button>
                  </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱：">
                  <el-input
                    v-model="form.email"
                    clearable
                    disabled
                    placeholder="邮箱"
                    maxlength="30"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别：">
                  <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane name="pwd">
            <template #label>
              <div style="display: flex; align-items: center">
                <el-icon><Key /></el-icon>
                <span style="margin-left: 6px">修改密码</span>
              </div>
            </template>
            <div class="form">
              <el-form
                :model="pForm"
                :rules="pRules"
                ref="pFormRef"
                label-width="100px">
                <el-form-item prop="oldPassword" label="旧密码">
                  <el-input
                    v-model="pForm.oldPassword"
                    placeholder="旧密码"
                    type="password"
                    clearable
                    show-password
                    maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="新密码">
                  <el-input
                    v-model="pForm.password"
                    placeholder="新密码"
                    type="password"
                    clearable
                    show-password
                    maxlength="20"
                    @input="pwdChange"></el-input>
                </el-form-item>
                <el-form-item prop="acPassword" label="确认密码">
                  <el-input
                    v-model="pForm.acPassword"
                    placeholder="确认密码"
                    type="password"
                    clearable
                    show-password
                    maxlength="20"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="btn-group">
          <el-button type="primary" @click="handleSave()">保存</el-button>
          <el-button type="danger">关闭</el-button>
        </div>
      </el-card>
    </div>

    <el-dialog v-model="dialog" title="修改头像">
      <div class="crop-wrapper">
        <div class="crop">
          <vue-cropper
            ref="cropper"
            :img="cropConfig.img"
            :autoCrop="true"
            :info="true"
            :autoCropWidth="160"
            :autoCropHeight="160"
            :fixedBox="true"
            :outputType="cropConfig.outputType"
            @realTime="realTime"></vue-cropper>
        </div>
        <div class="preview">
          <img :src="preview.url" :style="preview.img" />
        </div>
      </div>
      <template #footer>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Promotion, UserFilled } from '@element-plus/icons-vue';
import { FormInstance, FormRules, ElMessageBox } from 'element-plus';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { dialog } from '@/mixins';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { uploadFile } from '@/api/common';
import { passwordValidator, phoneRules } from '@/utils/validator';
import { changeInfo, changePassword } from '@/api/user';
import { useRouter } from 'vue-router';

const acPasswordValidator = (rule: any, val: string, callback: any) => {
  if ((val ?? '') == '') {
    callback(new Error('确认密码不能为空'));
  } else {
    if (val == pForm.password) {
      callback();
    } else {
      callback(new Error('两次密码不一致'));
    }
  }
};

let form = ref<User>({
  id: '',
  avatar: '',
  username: '',
  nickname: '',
  birth: '',
  sex: '',
  password: '',
  email: '',
  phone: '',
});
const rules = reactive<FormRules>({
  nickname: [{ required: true, message: '用户昵称不能为空' }],
  phone: [{ required: false, validator: phoneRules }],
  email: [
    { required: false },
    {
      type: 'email',
      message: '邮箱格式错误',
    },
  ],
});
const formRef = ref<FormInstance>();

const store = useStore();
const user = ref<User>({
  id: '',
  nickname: '',
  username: '',
  avatar: '',
});
user.value = JSON.parse(store.getters.user);
const avatar = ref<string>(store.getters.avatar);
form.value = JSON.parse(JSON.stringify(user.value));

const activeTab = ref<string>('info');

const pForm = reactive({
  oldPassword: '',
  password: '',
  acPassword: '',
});
const pRules = ref<FormRules>({
  oldPassword: [{ required: true, message: '旧密码不能为空' }],
  password: [{ required: true, validator: passwordValidator }],
  acPassword: [{ required: true, validator: acPasswordValidator }],
});
const pFormRef = ref<FormInstance>();

const mask = ref<boolean>(false);

let fileType = 'image/png';
const cropConfig = reactive({
  img: '/api' + user.value.avatar,
  outputType: 'png',
});
if (user.value.avatar.split('.')[1].includes('jpg')) {
  cropConfig.outputType = 'jpeg';
  fileType = 'image/jpeg';
} else {
  cropConfig.outputType = user.value.avatar.split('.')[1];
  fileType = 'image/png';
}
const cropper = ref();
const preview = ref<any>({});
const realTime = (data: any) => {
  preview.value = data;
};

const handleSubmit = () => {
  cropper.value?.getCropBlob((data: Blob) => {
    uploadFile(
      new File([data], user.value.username + '.' + cropConfig.outputType, {
        type: fileType,
      }),
      'change_avatar'
    ).then((res: Res) => {
      if (res.code === 200) {
        store.commit('SET_AVATAR', import.meta.env.VITE_API_PREFIX + res.data.url);
        dialog.value = false;
      }
    });
  });
};

const pwdChange = () => {
  console.log(pForm.password == pForm.acPassword);
  if (pForm.password == pForm.acPassword) {
    pFormRef.value?.clearValidate('password');
    pFormRef.value?.clearValidate('acPassword');
  } else if (pForm.acPassword != '') {
    pFormRef.value?.validateField('acPassword', (e: any) => {
      console.log(e);
    });
  }
};

const router = useRouter();
const handleSave = () => {
  if (activeTab.value == 'info') {
    const data = {
      nickname: form.value.nickname,
      phone: form.value.phone,
      email: form.value.email,
      sex: form.value.sex
    }
    changeInfo(data).then((res: Res) => {
      if (res.code === 200) {
        user.value.nickname = form.value.nickname;
        user.value.phone = form.value.phone;
        user.value.email = form.value.email;
        user.value.sex = form.value.sex;
        store.dispatch('storeInfo', user.value);
      }
    });
  } else {
    changePassword(pForm).then((res: Res) => {
      if (res.code === 200) {
        store.dispatch('clear');
        store.dispatch('closeSocket')
        ElMessageBox.alert('密码修改成功，请重新登陆', '系统提示', {
          callback: () => {
            router.replace('/');
          },
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.info-card {
  box-sizing: border-box;
  padding-bottom: 30px;

  .info-item {
    display: flex;
    padding: 10px 0;
    border-top: 1px solid #e7eaec;

    &:last-child {
      border-bottom: 1px solid #e7eaec;
    }
  }

  .avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 20px auto 30px;

    & > * {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba($color: #000000, $alpha: 0.4);
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.7s;

      &.show {
        opacity: 1;
      }
    }
  }

  .label-cell {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 80px;

    span {
      margin-left: 10px;
    }
  }

  .value-cell {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
}

.panel {
  width: 100%;
  margin-left: 30px;

  .form {
    margin-top: 30px;
  }
}
.crop-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.crop {
  width: 300px;
  height: 300px;
}

.preview {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  background-color: #ffffff;
  overflow: hidden;
}
.btn-group {
  margin: 30px 0 0 50px;
}
</style>
