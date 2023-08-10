<template>
  <div class="container">
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input v-model="siftName" placeholder="角色名称" clearable maxlength="20"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="primary" icon="search">查询</el-button>
          <el-button type="primary" icon="plus" @click="dialog = true">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="dataList" :height="650">
        <el-table-column prop="id" label="#" align="center"></el-table-column>
        <el-table-column prop="name" label="标识" align="center"></el-table-column>
        <el-table-column prop="label" label="身份名称" align="center"></el-table-column>
        <el-table-column prop="menuLabel" label="菜单权限" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <DropdownControll :row="scope.row" @edit="handleEdit(scope.row)" @remove="handleRemove(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :total="total" v-model:current-page="current" v-model:page-size="size"
          :page-sizes="[20, 30, 50, 100, 200, 500]" background
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>

    <el-dialog v-model="dialog" title="权限管理">
      <el-form :model="form" :rules="rules" ref="refForm" label-position="left" label-width="80px">
        <el-form-item prop="id" v-show="false">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色标识">
          <el-input v-model="form.name" clearable maxlength="20" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="label" label="角色名称">
          <el-input v-model="form.label" clearable maxlength="20" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="menus" label="菜单">
          <el-cascader v-model="menuArr" :options="menus" :props="{
            multiple: true,
            value: 'id',
            label: 'label'
          }" collapse-tags collapse-tags-tooltip></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup lang='ts'>
import { total, size, current, siftName, changePageSize, } from '@/mixins';
import { getData, addRole, updateRole, removeRole } from '@/api/permission';
import { getAllMenu } from '@/api/menu';
import { ref, reactive, onMounted } from 'vue';
import { FormInstance } from 'element-plus';
import { formatMenu, deRepeat, getCascaderDefaultVal } from '@/utils/util'

let dataList = ref<Permission[]>([])
const menuArr = ref<string>('')
const getDataList = () => {
  getData({ size: size.value, current: current.value, siftName: siftName.value }).then((res: Res) => {
    const { code, data } = res
    if (code === 200) {
      dataList.value = data.data;
      total.value = data.total
    }
  })
}
let menus = ref<Menus[]>([])
getAllMenu().then((res: Res) => {
  if (res.code === 200) {
    menus.value = formatMenu(res.data)
  }
})
changePageSize(getDataList)

const dialog = ref<boolean>(false)
const form = reactive<Permission>({
  id: '',
  name: '',
  label: '',
  menus: ''
})
const rules = reactive({
  name: [
    { required: true, message: '请输入角色标识' }
  ],
  label: [
    { required: true, message: '请输入角色名称' }
  ]
})
const refForm = ref<FormInstance>()

const handleSubmit = () => {
  refForm.value?.validate((valid : boolean) => {
    if(valid) {
      form.menus = deRepeat(menuArr.value + '')
      if((form.id ?? '') == '') {
        addRole(form).then((res : Res) => {
          if(res.code === 200) {
            location.reload()
          }
        })
      }else {
        updateRole(form).then((res : Res) => {
          if(res.code === 200) {
            location.reload()
          }
        })
      }
    }
  })
}

const handleEdit = (row : any) => {
  console.log(row.menus);
  console.log(getCascaderDefaultVal(JSON.parse(row.menus)));
  dialog.value = true
  form.id = row.id
  form.name = row.name
  form.label = row.label
  menuArr.value = getCascaderDefaultVal(JSON.parse(row.menus))
}

const handleRemove = (row : any) => {
  removeRole(row).then((res : Res) => {
    if(res.code === 200) {
      location.reload()
    }
  })
}

onMounted(() => {
  getDataList()
})
</script>
  
<style lang="scss" scoped>
  .el-form {
    width: 300px;
  }
</style>