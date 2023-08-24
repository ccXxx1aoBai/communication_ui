<template>
  <div class="container">
    <div class="form">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item prop="version" label="版本名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item prop="versionCode" label="版本号：">
          <el-row>
            <el-col :span="20">
              <el-input></el-input>
            </el-col>
            <el-col :span="2">
              <el-tooltip placement="top-start">
                <el-icon>
                  <Info />
                </el-icon>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="platform" label="更新平台：">
          <el-radio-group v-model="form.platform">
            <el-radio label="android"></el-radio>
            <el-radio label="ios"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="force" label="强制更新：">
          <el-radio-group v-model="form.platform">
            <el-radio label="否" :value="0"></el-radio>
            <el-radio label="是" :value="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="description" label="更新内容：">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';

const form = reactive<Upgrade>({
  version: '',
  versionCode: '',
  platform: '',
  force: false,
  description: '',
});

const rules = reactive<FormRules>({
  version: [
    { required: true, message: '请输入版本名称' }
  ],
  versionCode: [
    { required: true, message: '请输入版本号' }
  ],
  description: [
    { required: true, message: '请输入更新内容' }
  ]
})

const formRef = ref<FormInstance>()


</script>

<style lang="scss" scoped></style>
