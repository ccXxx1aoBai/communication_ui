<template>
    <div class="container">
      <div class="tools">
        <el-row>
          <el-col :span="3">
            <el-input type="textarea" rows="2" clearable placeholder="内容" maxlength="-1" v-model="siftContent"
            :autosize="{minRows: 2, maxRows: 2}" resize="none"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select clearable v-model="siftType" placeholder="内容类型">
              <el-option v-for="(type, index) in types" :key="index" :label="type.label" :value="type.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select clearable placeholder="状态" v-model="siftStatus">
              <el-option v-for="(s, index) in status" :key="index" :label="s.label" :value="s.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" el-icon="search">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-table :data="dataList" height="650">
          <el-table-column prop="content" label="文本内容" align="center"></el-table-column>
          <el-table-column prop="resource" label="图片/视频" align="center">
            <template>

            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center"></el-table-column>
          <el-table-column prop="type" label="类型" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="publishTime" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-dropdown :show-timeout="50">
              <el-icon>
                <more-filled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button icon="select" text class="warning" @click="handlePass(scope.row)">审核</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button icon="close-bold" text class="warning" @click="handleReject(scope.row)">拒绝</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button icon="edit" text class="warning" @click="handleDown(scope.row)">下架</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button icon="delete" text class="delete" @click="handleDel(scope.row)">删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { siftContent, siftType, siftStatus } from '@/mixins';
import { ref } from 'vue';

const types = ref([
  {
    label: '图文',
    value: '0'
  },
  {
    label: '视频',
    value: '1'
  },
  {
    label: '话题',
    value: '2'
  }
])
const status = ref([
  {
    label: '待提交',
    value: '0'
  },
  {
    label: '待审核',
    value: '1'
  },
  {
    label: '已通过',
    value: '2'
  },
  {
    label: '审核未通过，待修改',
    value: '3'
  },
  {
    label: '已下架',
    value: '4'
  }
])
const dataList = ref<Article[]>([])
  
const handlePass = (row: Article) => {
  console.log(row);
}

const handleReject = (row: Article) => {
  console.log(row);
}

const handleDown = (row: Article) => {
  console.log(row);
}

const handleDel = (row: Article) => {
  console.log(row);
}

</script>
  
<style>
  
</style>