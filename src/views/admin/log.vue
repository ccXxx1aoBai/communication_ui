<template>
  <div class="container">
    <div class="table">
      <el-table :data="dataList" height="650">
        <el-table-column
          prop="user"
          label="操作人"
          align="center"
        ></el-table-column>
        <el-table-column prop="ip" label="IP" align="center"></el-table-column>
        <el-table-column
          prop="agent"
          label="Agent"
          align="center"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="method"
          label="请求接口"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="args"
          label="入参"
          align="center"
          width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="opType"
          label="操作类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="操作描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="longTime"
          label="请求耗时"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="请求时间"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="total"
          v-model:current-page="current"
          v-model:page-size="size"
          :page-sizes="[20, 30, 50, 100, 200, 500]"
          background
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLog } from '@/api/common';
import { total, current, size, changePageSize } from '@/mixins';

const dataList = ref<Log[]>([]);

const getDataList = () => {
  getLog({
    size: size.value,
    current: current.value,
  }).then((res: Res) => {
    if (res.code === 200) {
      const { data } = res;
      dataList.value = data.data;
      total.value = data.total;
    }
  });
};

onMounted(() => {
  getDataList();
});

changePageSize(getDataList);
</script>

<style scoped lang="scss"></style>
