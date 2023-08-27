import axios from 'axios'
import store from '@/store'
import AesUtil from './AesUtil'
import Prompt from './enum'
import { ElNotification, ElMessage, ElMessageBox, ElLoading } from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

const server = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30 * 1000
})

let loading: any = null;
let request = new Map();

let removePending = function (config: any) {
  var key = `${config.method}:${config.url}`;
  var func = request.get(key);
  if (func) {
    func();
    request.delete(key);
    // requests--;
  }
}

let requests = 0;
const svg = `<svg t="1689760228468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2304"><path d="M843.307 742.24c0 3.217 2.607 5.824 5.824 5.824s5.824-2.607 5.824-5.824a5.823 5.823 0 0 0-5.824-5.824 5.823 5.823 0 0 0-5.824 5.824zM714.731 874.912c0 6.398 5.186 11.584 11.584 11.584s11.584-5.186 11.584-11.584-5.186-11.584-11.584-11.584-11.584 5.186-11.584 11.584zM541.419 943.2c0 9.614 7.794 17.408 17.408 17.408s17.408-7.794 17.408-17.408-7.794-17.408-17.408-17.408-17.408 7.794-17.408 17.408z m-186.56-9.152c0 12.795 10.373 23.168 23.168 23.168s23.168-10.373 23.168-23.168-10.373-23.168-23.168-23.168-23.168 10.373-23.168 23.168zM189.355 849.12c0 16.012 12.98 28.992 28.992 28.992s28.992-12.98 28.992-28.992-12.98-28.992-28.992-28.992-28.992 12.98-28.992 28.992zM74.731 704.736c0 19.228 15.588 34.816 34.816 34.816s34.816-15.588 34.816-34.816-15.588-34.816-34.816-34.816-34.816 15.588-34.816 34.816z m-43.008-177.28c0 22.41 18.166 40.576 40.576 40.576s40.576-18.166 40.576-40.576-18.166-40.576-40.576-40.576-40.576 18.166-40.576 40.576z m35.392-176.128c0 25.626 20.774 46.4 46.4 46.4s46.4-20.774 46.4-46.4c0-25.626-20.774-46.4-46.4-46.4-25.626 0-46.4 20.774-46.4 46.4z m106.176-142.016c0 28.843 23.381 52.224 52.224 52.224s52.224-23.381 52.224-52.224c0-28.843-23.381-52.224-52.224-52.224-28.843 0-52.224 23.381-52.224 52.224z m155.904-81.344c0 32.024 25.96 57.984 57.984 57.984s57.984-25.96 57.984-57.984-25.96-57.984-57.984-57.984-57.984 25.96-57.984 57.984z m175.104-5.056c0 35.24 28.568 63.808 63.808 63.808s63.808-28.568 63.808-63.808c0-35.24-28.568-63.808-63.808-63.808-35.24 0-63.808 28.568-63.808 63.808z m160.32 72.128c0 38.421 31.147 69.568 69.568 69.568s69.568-31.147 69.568-69.568-31.147-69.568-69.568-69.568-69.568 31.147-69.568 69.568z m113.92 135.488c0 41.638 33.754 75.392 75.392 75.392s75.392-33.754 75.392-75.392-33.754-75.392-75.392-75.392-75.392 33.754-75.392 75.392z m45.312 175.488c0 44.854 36.362 81.216 81.216 81.216s81.216-36.362 81.216-81.216c0-44.854-36.362-81.216-81.216-81.216-44.854 0-81.216 36.362-81.216 81.216z" fill="#409eff" p-id="2305"></path></svg>`;
server.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new axios.CancelToken((cancelToken) => {
      request.set(`${config.method}:${config.url}`, cancelToken)
    });
    const token = store.getters.token;
    const auth = store.getters.id;
    if (token) {
      config.headers.token = token;
    }
    if (auth) {
      config.headers.auth = AesUtil.encrypt(auth);
    }
    if (config.url?.indexOf('upload') == -1) {
      config.data = {
        data: AesUtil.encrypt(JSON.stringify(config.data))
      }
    }
    if (loading === null) {
      loading = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.8)',
        spinner: svg
      })
    }
    requests++;
    return config;
  },
  error => {
    console.log(error);
    closeLoading()
    ElNotification.error('网络错误');
  }
)

server.interceptors.response.use(
  (response) => {
    closeLoading()
    console.log(response.data);
    if (response.headers.token) {
      store.dispatch('storeToken', response.headers.token);
    }
    const { status } = response;
    const data: any = JSON.parse(AesUtil.decrypt(response.data));
    if ((data ?? '') == '') {
      errorNotification('请求出错啦')
    }
    if (data.code === 200) {
      data.msg && successNotification(data.msg);
    }
    if (data.code === 300) {
      warnNotification(data.msg);
    }
    if (data.code === 500) {
      errorNotification(data.msg);
    }
    if (status === 404) {
      errorNotification(Prompt.RESOURCE_NO_EXIST);
    } else if (status === 401) {
      store.dispatch('clear')
      ElMessageBox.alert('身份已过期，请重新登陆', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = '/';
      }).catch(() => {
        window.location.href = '/';
      })
    }
    return data
  },
  error => {
    closeLoading()
    if (error.message === 'canceled') {
      return error
    }
    if (error.message == 'timeout of 30000ms exceeded') {
      errorNotification(Prompt.REQUEST_TIMEOUT);
      return error
    }
    if (error.code == 'ERR_NETWORK') {
      errorNotification(Prompt.NETWORK_ERROR);
      return error
    }
    const { status } = error.response;
    console.log('请求失败：', error.response);
    if (status === 403) {
      store.dispatch('clear')
      ElMessageBox.alert('身份过期，请重新登陆', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = '/';
      }).catch(() => {
        window.location.href = '/';
      })
    } else if (status === 404) {
      errorNotification(Prompt.RESOURCE_NO_EXIST);
    } else if (status === 500) {
      errorNotification('服务异常');
    } else {
      errorNotification('请求错误');
    }
    return error
  }
)

const closeLoading = () => {
  requests--;
  if (requests == 0) {
    loading?.close()
    loading = null
  }
}
const successNotification = (msg: string) => {
  ElMessage.success(msg);
}

const warnNotification = (msg: string) => {
  ElMessage.warning(msg);
}

const errorNotification = (msg: string) => {
  ElMessage.error(msg);
}

export default server