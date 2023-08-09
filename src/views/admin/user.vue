<template>
  <div class="container">
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input placeholder="用户名" v-model="siftName" clearable maxlength="30"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button icon="search" type="primary" @click="getDataList()">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="dataList" height="650">
        <el-table-column prop="avatar" label="头像" align="center">
          <template v-slot="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名/昵称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column prop="isBind" label="是否绑定微信" align="center">
          <template v-slot="scope">
            {{ scope.row.isBind ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="online" label="是否在线" align="center">
          <template v-slot="scope">
            {{ scope.row.online ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-dropdown trigger="click">
              <el-icon>
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      icon="finished"
                      text
                      class="warning"
                      @click="handleEnable(scope.row)"
                      >启用</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      icon="select"
                      text
                      class="warning"
                      @click="handleBanned(scope.row)"
                      >禁用</el-button
                    >
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
import { siftName, total, size, current, changePageSize } from '@/mixins';
import { ref, onMounted } from 'vue';
import { getUserList, enableUser, bannedUser } from '@/api/user';

const dataList = ref<User[]>([]);

const getDataList = () => {
  getUserList({
    current: current.value,
    size: size.value,
    siftName: siftName.value,
  }).then((res: Res) => {
    const { code, data } = res;
    if (code === 200) {
      dataList.value = data.data.map((item: User) => {
        item.avatar = '/api' + item.avatar;
        return item;
      });
      total.value = data.total;
    }
  });
};

changePageSize(getDataList);

onMounted(() => {
  getDataList();
});

const handleEnable = (row: User) => {
  console.log(row);
  enableUser({ id: row.id }).then((res: Res) => {
    console.log(res);
  });
};

const handleBanned = (row: User) => {
  bannedUser({ id: row.id }).then((res: Res) => {
    console.log(res);
  });
};
</script>

<style></style>
