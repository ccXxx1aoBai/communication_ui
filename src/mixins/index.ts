import { ref, reactive, watch } from 'vue';
import * as Icon from '@/components/svg';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { FormInstance } from 'element-plus';

export let total = ref(0);
export const current = ref(1);
export const size = ref(20);
export const dialog = ref(false);
export const siftName = ref('');
export const siftContent = ref('');
export const siftType = ref('');
export const siftStatus = ref('1');

const iconArr = reactive<string[]>([]);
for (const [key] of Object.entries(Icon)) {
  iconArr.push(key);
}
for (const [key] of Object.entries(ElementPlusIconsVue)) {
  iconArr.push(key);
}
export const icons = iconArr;

export const changePageSize = (fn: Function) => {
  watch(size, () => {
    fn();
  });
  watch(current, () => {
    fn();
  });
};

export const beforeClose = (refForm: FormInstance | undefined) => {
  refForm?.resetFields();
};
