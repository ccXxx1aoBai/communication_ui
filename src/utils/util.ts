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
      sort: item.sort
    };
    data.push(obj);
  })
  return data; 
}

export const formatMenu = (menus : Menus[]) : Menus[] => {
  const parent = menus.filter(m => {
    return m.parent == 0
  })
  parent.forEach(p => {
    if(!p.children) {
      p.children = []
    }
    menus.forEach(c => {
      if(p.id == c.parent) {
        p.children?.push(c)
      }
    })
  })
  return parent
}

export const deRepeat = (str : string) : string => {
  const strs = str.split(',');
  const newStrs = new Set([...strs])
  return [...newStrs] + ''
}

/**
 * 菜单转级联菜单（仅支持二级）
 * @param data 菜单数据
 * @returns Array 转换后数据
 */
export const getCascaderDefaultVal = (data : any[]) : any => {
  const arr : any[] = []
  data.forEach((d : any) => {
    if(d?.children?.length > 0) {
      d.children.forEach((c : any) => {
        const cx = [d.id]
        cx.push(c.id)
        arr.push(cx)
      })
    }else {
      arr.push([d.id])
    }
  })
  return arr;
}