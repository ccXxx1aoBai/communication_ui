<template>
  <div class="container">
    <div class="tools">
      <el-row>
        <el-col :span="3">
          <el-input
            v-model="siftName"
            clearable
            maxlength="20"
            placeholder="菜单名称"
          ></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button icon="search" type="primary" @click="getDataList()"
            >查询</el-button
          >
          <el-button icon="plus" type="primary" @click="dialogForm = true"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="dataList" height="650">
        <el-table-column
          prop="label"
          label="菜单名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="路由名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="path"
          label="路由地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="component"
          label="组件路径"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="icon"
          label="图标"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        ></el-table-column>
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
                      icon="edit"
                      text
                      class="waring"
                      @click="handleEdit(scope.row)"
                      >修改</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      icon="delete"
                      text
                      class="delete"
                      @click="handleDel(scope.row)"
                      >删除</el-button
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

    <el-dialog
      title="菜单管理"
      v-model="dialogForm"
      draggable
      :close-on-click-modal="false"
      @close="beforeClose(refForm)"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="refForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item prop="label" label="菜单名称">
          <el-input v-model="form.label" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="路由名称">
          <el-input v-model="form.name" placeholder="路由名称"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="路由路径">
          <el-input v-model="form.path" placeholder="路由路径"></el-input>
        </el-form-item>
        <el-form-item prop="component" label="组件路径">
          <el-input v-model="form.component" placeholder="组件路径"></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="图标" class="icon-form">
          <el-input
            v-model="form.icon"
            placeholder="图标"
            clearable
            @focus="onFocus"
            @change="onChange"
            @blur="onBlur()"
          >
            <template #prefix>
              <el-icon>
                <component :is="curIcon ? curIcon : 'Home'" />
              </el-icon>
            </template>
          </el-input>
          <div class="icon-panel" :class="{ trigger: trigger }">
            <el-icon
              v-for="icon in icons"
              :key="icon"
              @click="
                selectIcon(icon);
                trigger = false;
              "
            >
              <component
                :is="icon"
                :color="icon == form.icon ? '#A473E5' : 'currentColor'"
              />
            </el-icon>
          </div>
        </el-form-item>
        <el-form-item prop="parent" label="父级菜单">
          <el-select v-model="form.parent" placeholder="父级菜单">
            <el-option
              v-for="menu in menus"
              :key="menu.id"
              :value="menu.id"
              :label="menu.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort" label="优先级">
          <el-input-number
            v-model="form.sort"
            placeholder="优先级"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit()">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, nextTick, onBeforeUnmount } from 'vue';
import { getMenu, addMenu, updateMenu, removeMenu } from '@/api/menu';
import {
  total,
  size,
  current,
  siftName,
  dialog,
  changePageSize,
  icons,
  beforeClose,
} from '@/mixins';
import { ElMessageBox, FormInstance } from 'element-plus';

onMounted(() => {
  getDataList();
});

let dataList = ref<Menus[]>([]);
let menus = ref<Menus[]>([]);
const getDataList = () => {
  getMenu({
    size: size.value,
    current: current.value,
    siftName: siftName.value,
  }).then((res: any) => {
    if (res.code === 200) {
      dataList.value = res.data.data;
      total.value = res.data.total;
      menus.value = JSON.parse(JSON.stringify(dataList.value));
      menus.value.unshift({ id: 0, label: '根目录', sort: 0 });
    }
  });
};
changePageSize(getDataList);

let form = reactive<Menus>({
  id: '',
  name: '',
  label: '',
  path: '',
  icon: 'Home',
  component: '',
  sort: 0,
  parent: '',
});
const rules = reactive({
  label: [{ required: true, message: '请输入菜单名称' }],
});
const refForm = ref<FormInstance>();

let curIcon = ref('Home');
const selectIcon = (icon: string) => {
  form.icon = icon;
  curIcon.value = icon;
};

let trigger = ref<boolean>(false);
const onFocus = () => {
  trigger.value = true;
};
let timer = null as any;
const onBlur = () => {
  timer = setTimeout(() => {
    trigger.value = false;
  }, 100);
};
const onChange = (val: string) => {
  if (parseInt(val) + '' != '') {
    return false;
  }
};

let dialogForm = dialog;
const handleEdit = (row: any) => {
  dialogForm.value = true;
  nextTick(() => {
    form.id = row.id;
    form.name = row.name;
    form.label = row.label;
    form.path = row.path;
    form.icon = row.icon;
    form.component = row.component;
    form.sort = row.sort;
    form.parent = row.parent;
  });
};

const handleDel = (row: Menus) => {
  +ElMessageBox.confirm(
    '是否删除此数据，此操作将导致以此为父级菜单被移除！',
    '系统提示',
    {
      showCancelButton: true,
      confirmButtonClass: 'el-button--danger',
    }
  ).then(() => {
    removeMenu(row).then((res: Res) => {
      if (res.code === 200) {
        getDataList();
      }
    });
  });
};

const handleSubmit = () => {
  refForm.value?.validate((valid: boolean) => {
    if (valid) {
      if ((form.id ?? '') == '') {
        addMenu(form).then((res: Res) => {
          if (res.code === 200) {
            refForm.value?.resetFields();
          }
        });
      } else {
        updateMenu(form).then((res: Res) => {
          if (res.code === 200) {
            dialogForm.value = false;
          }
        });
      }
    }
  });
};

onBeforeUnmount(() => {
  timer && clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.el-form {
  width: 300px;
}

.icon-form {
  position: relative;

  .icon-panel {
    position: absolute;
    top: 40px;
    right: 0;
    transform: translateX(50%);
    display: none;
    opacity: 0;
    width: 600px;
    height: 400px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba($color: #000000, $alpha: 0.3);
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 999;

    .el-icon {
      padding: 10px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  &:focus-within {
    .icon-panel {
      display: block;
      opacity: 1;
    }
  }

  .icon-panel.trigger {
    display: block;
    opacity: 1;
  }
}
</style>
