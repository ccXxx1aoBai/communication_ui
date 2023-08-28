<template>
  <div class="container">
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input
            v-model="siftName"
            clearable
            placeholder="版本号"
            maxlength="20"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="siftType" clearable placeholder="发布平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" icon="search" @click="getDataList()">
            查询
          </el-button>
          <el-button type="primary" icon="plus" @click="dialog = true">
            发布
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="dataList" :height="610">
        <el-table-column prop="version" label="版本名称" align="center">
          <template v-slot="scope">
            {{ scope.row.version }}
            <el-icon v-if="scope.row.current"><Paperclip /></el-icon>
          </template>
        </el-table-column>
        <el-table-column
          prop="versionCode"
          label="版本号"
          align="center"></el-table-column>
        <el-table-column
          prop="platform"
          label="更新平台"
          align="center"></el-table-column>
        <el-table-column prop="forceUpdate" label="是否强制更新" align="center">
          <template v-slot="scope">
            <el-tag :type="scope.row.forceUpdate ? 'success' : 'info'">
              {{ scope.row.forceUpdate ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-dropdown :show-timeout="50">
              <el-icon>
                <more-filled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      icon="refreshRight"
                      text
                      class="warning"
                      @click="handleRoll(scope.row)">
                      版本回退
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      icon="delete"
                      text
                      class="delete"
                      @click="handleDel(scope.row)">
                      删除
                    </el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="total"
          v-model:current-page="current"
          v-model:page-size="size"
          :page-sizes="[20, 30, 50, 100, 200, 500]"
          background
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
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
        <el-form-item prop="forceUpdate" label="强制更新：">
          <div class="input-content">
            <el-radio-group v-model="form.forceUpdate">
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
              :headers="{
                token: store.getters.token,
              }"
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
        <el-button type="primary" @click="handleSubmit()"> 提交 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  dialog,
  total,
  size,
  current,
  changePageSize,
  siftType,
  siftName,
} from '@/mixins';
import {
  FormInstance,
  FormRules,
  UploadRawFile,
  UploadProgressEvent,
  UploadFile,
  UploadFiles,
  UploadInstance,
  ElMessage,
  ElMessageBox,
} from 'element-plus';
import { ref, reactive, onBeforeUnmount } from 'vue';
import {
  publishVersion,
  getData,
  versionRollback,
  removeVersion,
} from '@/api/upgrade';
import { useStore } from 'vuex';
import AesUtil from '@/utils/AesUtil';

const store = useStore();

const form = reactive<Upgrade>({
  version: '',
  versionCode: '',
  platform: 'android',
  forceUpdate: 0,
  description: '',
  source: '',
});

const versionCodeValidator = (rule: any, val: any, callback: any) => {
  if ((val ?? '') == '') {
    callback(new Error('请输入版本号'));
  } else {
    if (form.version.replace(/\./g, '') == form.versionCode) {
      callback();
    } else {
      callback(new Error('版本名称和版本号请保持一致'));
    }
  }
};

const rules = reactive<FormRules>({
  version: [{ required: true, message: '请输入版本名称' }],
  versionCode: [{ required: true, validator: versionCodeValidator }],
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
  console.log('onsuccess: ', AesUtil.decrypt(response));
  response = JSON.parse(AesUtil.decrypt(response));
  form.source = response.data.url;
};

const uploadFail = (error: Error) => {
  console.error(error);
};

onBeforeUnmount(() => {
  uploadRef.value?.abort(upfile);
});

const handleSubmit = () => {
  publishVersion(form).then((res: Res) => {
    if (res.code === 200) {
      formRef.value?.resetFields();
      dialog.value = false;
      getDataList();
    }
  });
};

const dataList = ref<Upgrade[]>([]);
const getDataList = () => {
  const data = {
    size: size.value,
    current: current.value,
    siftName: siftName.value,
    siftType: siftType.value,
  };
  getData(data).then((res: Res) => {
    if (res.code === 200) {
      dataList.value = res.data.data;
      total.value = res.data.total;
    }
  });
};
getDataList();
changePageSize(getDataList);

const handleRoll = (row: Upgrade) => {
	if (row.current) {
    ElMessage.warning({
      message: '已是当前版本',
    });
		return
  }
  ElMessageBox.confirm('是否回退此版本？', '系统提示', {
    showCancelButton: true,
  }).then(() => {
    versionRollback(row).then((res: Res) => {
      console.log(res);
      if (res.code === 200) {
        getDataList();
      }
    });
  });
};

const handleDel = (row: Upgrade) => {
  if (row.current) {
    ElMessage.warning({
      message: '请切换版本后再删除',
    });
		return
  }
  ElMessageBox.confirm('是否删除此版本？', '系统提示', {
    showCancelButton: true,
  }).then(() => {
    removeVersion(row).then((res: Res) => {
      if (res.code === 200) {
        getDataList();
      }
    });
  });
};
</script>

<style lang="scss" scoped>
.input-content {
  width: 240px;
}
.upload {
  width: 450px;
}
</style>
