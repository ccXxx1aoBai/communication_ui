<template>
  <div class="container">
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-select clearable placeholder="类型" v-model="siftType">
            <el-option value="0" label="建议"></el-option>
            <el-option value="1" label="问题"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select clearable placeholder="处理状态" v-model="siftStatus">
            <el-option value="0" label="待解决"></el-option>
            <el-option value="1" label="已解决"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button icon="search" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="dataList" height="650">
        <el-table-column prop="" label="" align="center"></el-table-column>
        <el-table-column prop="" label="" align="center"></el-table-column>
        <el-table-column prop="" label="" align="center"></el-table-column>
        <el-table-column prop="" label="" align="center"></el-table-column>
        <el-table-column prop="" label="" align="center"></el-table-column>
        <el-table-column prop="" label="" align="center">
          <template v-slot="scope">
            <el-dropdown trigger="click">
              <el-icon>
                <MoreFilled />
              </el-icon>
              <template  #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                      <el-button icon="finished" text class="warning">已解决</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button icon="select" text class="warning">已反馈</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { total, current, size, siftType, siftStatus } from "@/mixins";

const dataList = ref([{}])
</script>

<style lang="scss" scoped>
  
</style>
