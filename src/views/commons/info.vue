<template>
  <div class="container">
    <div style="flex: 0 0 400px;">
      <el-card header="个人信息">
        <div class="info-card">
          <div>
            <div class="avatar">
              <img :src="'/api' + user.avatar" class="avatar-img">
              <div class="mask">
                <el-icon :size="24" color="#f1f1f1">
                  <EditPen />
                </el-icon>
              </div>
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
                <el-form-item prop="" label="手机号码：">
                  <el-input
                    v-model="form.phone"
                    clearable
                    placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="" label="邮箱：">
                  <el-input
                    v-model="form.email"
                    clearable
                    placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别：">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
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
              <el-form :model="pForm" :rules="pRules" ref="pFormRef" label-width="100px">
                <el-form-item prop="oldPassword" label="旧密码">
                  <el-input v-model="pForm.oldPassword" placeholder="旧密码" type="password" clearable show-password></el-input>
                </el-form-item>
                <el-form-item prop="password" label="新密码">
                  <el-input v-model="pForm.password" placeholder="新密码" type="password" clearable show-password></el-input>
                </el-form-item>
                <el-form-item prop="acPassword" label="确认密码">
                  <el-input v-model="pForm.acPassword" placeholder="确认密码" type="password" clearable show-password></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Promotion, UserFilled } from '@element-plus/icons-vue';
import { FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const form = reactive<User>({
  id: '',
  avatar: '',
  username: '',
  nickname: '',
  birth: '',
  sex: '',
  password: '',
  email: '',
});
const rules = reactive<FormRules>({});
const formRef = ref<FormInstance>();

const store = useStore();
const user = ref<User>({
  id: '',
  nickname: '',
  username: '',
  avatar: '',
});
user.value = JSON.parse(store.getters.user);

const activeTab = ref<String>('info');

const pForm = reactive({
  oldPassword: '',
  password: '',
  acPassword: ''
})
const pRules = ref<FormRules>({
  oldPassword: [
    { required: true, message: '旧密码不能为空' },
  ],
  password: [
    { required: true, message: '新密码不能为空' }
  ],
  acPassword: [
    { required: true, message: '确认密码不能为空'}
  ]
})
const pFormRef = ref<FormInstance>()
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.info-card {
  box-sizing: border-box;

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
      background-color: rgba($color: #000000, $alpha: .4);
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
</style>
