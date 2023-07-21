import { defineComponent } from 'vue';

/**
 * 格式化路由
 * @param memus 路由数据
 * @returns 
 */
export const getRoutes = (memus : []) : Menus[] => {
  const data : Menus[] = []
  const modules = import.meta.glob(`@/**/*.vue`);
  memus.forEach((item : Menus) => {
    const component = item.component ? modules[`/src/${item.component}.vue`] : '';
    const obj = {
      id: item.id,
      label: item.label,
      name: item.name,
      path: item.path || item.name,
      component: component,
      meta: {
        title: item.label
      },
      icon: item.icon,
      parent: item.parent,
      sort: item.sort,
    };
    data.push(obj);
  })
  return data;
}