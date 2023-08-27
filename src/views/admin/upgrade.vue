<template>
  <div class="container">
    <div class="tools">
      <el-button type="primary" icon="plus" @click="dialog = true">发布</el-button>
    </div>
    <div class="table">
      <el-table :data="dataList" :height="610">
        <el-table-column prop="" label="版本名称" align="center"></el-table-column>
        <el-table-column prop="" label="版本号" align="center"></el-table-column>
        <el-table-column prop="" label="更新平台" align="center"></el-table-column>
        <el-table-column prop="" label="是否强制更新" align="center"></el-table-column>
        <el-table-column prop="" label="发布时间" align="center"></el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialog" title="版本发布">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item prop="version" label="版本名称：">
          <div class="input-content">
            <el-row>
              <el-col :span="21">
                <el-input
                  v-model="form.version"
                  clearable
                  maxlength="20"
                  placeholder="版本名称"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-tooltip
                  placement="top-start"
                  content="对应打包配置文件应用版本名称，例：1.0.0">
                  <el-icon>
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item prop="versionCode" label="版本号：">
          <div class="input-content">
            <el-row>
              <el-col :span="21">
                <el-input
                  v-model="form.versionCode"
                  clearable
                  maxlength="20"
                  placeholder="版本号"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-tooltip
                  placement="top-start"
                  content="对应打包配置文件应用版本号，例：100">
                  <el-icon>
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item prop="platform" label="更新平台：">
          <div class="input-content">
            <el-radio-group v-model="form.platform">
              <el-radio label="android">Android</el-radio>
              <el-radio label="ios">IOS</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="force" label="强制更新：">
          <div class="input-content">
            <el-radio-group v-model="form.force">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="description" label="更新内容：">
          <div class="input-content" style="width: 300px">
            <el-row>
              <el-col :span="21">
                <el-input
                  type="textarea"
                  v-model="form.description"
                  placeholder="更新内容，内容以;分割"
                  :rows="4"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-col :span="2" :offset="1">
                  <el-tooltip
                    placement="top-start"
                    content="更新内容以英文;分割，例：1、增加功能;2、修复bug;">
                    <el-icon>
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item prop="" label="更新包：">
          <div class="upload">
            <el-upload
              drag
              action="/api/upload"
              :data="{ type: 'wgt' }"
              :limit="1"
              ref="uploadRef"
              :before-upload="beforeUpload"
              :on-progress="onUpload"
              :on-success="uploadSuccess"
              :on-error="uploadFail">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { dataList, dialog } from '@/mixins'
import {
  FormInstance,
  FormRules,
  UploadRawFile,
  UploadProgressEvent,
  UploadFile,
  UploadFiles,
  UploadInstance,
  ElMessage,
} from 'element-plus';
import { ref, reactive, onBeforeUnmount } from 'vue';

const form = reactive<Upgrade>({
  version: '',
  versionCode: '',
  platform: 'android',
  force: 0,
  description: '',
});

const rules = reactive<FormRules>({
  version: [{ required: true, message: '请输入版本名称' }],
  versionCode: [{ required: true, message: '请输入版本号' }],
  description: [{ required: true, message: '请输入更新内容' }],
});

const formRef = ref<FormInstance>();
const uploadRef = ref<UploadInstance>();

const fileTypes = [
  'application/vnd.android.package-archive',
  'application/x-itunes-ipa',
];
const beforeUpload = (file: UploadRawFile) => {
  if (file.name.includes('.wgt') || fileTypes.includes(file.type)) {
    return true;
  } else {
    ElMessage.error({
      message: '仅支持wgt包',
    });
    return false;
  }
};

let upfile: UploadFile;
const onUpload = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) => {
  console.log('onprogress: ', evt);
  console.log('onprogress: ', uploadFile);
  console.log('onprogress: ', uploadFiles);
  upfile = uploadFile;
};

const uploadSuccess = (response: any) => {
  console.log('onsuccess: ', response);
};

const uploadFail = (error: Error) => {
  console.error(error);
};

onBeforeUnmount(() => {
  uploadRef.value?.abort(upfile);
});
</script>

<style lang="scss" scoped>
.input-content {
  width: 240px;
}
.upload {
  width: 450px;
}
</style>
