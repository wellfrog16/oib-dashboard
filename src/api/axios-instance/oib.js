import axios from 'axios';
import { Loading, Notification } from 'element-ui';

// const baseURL = 'http://localhost:9999/oib-api';
const baseURL = 'http://oib-cms.test.tron-m.com/oib-api';

const instance = axios.create({
  // baseURL: 'http://www.tron-m.com/oib-api',
  baseURL,
  // baseURL: 'http://oib-cms.tron-m.com/oib-api',
  withCredentials: true,
  timeout: 5000
});

let loadingInstancce;

instance.interceptors.request.use((require) => {
  loadingInstancce = Loading.service({
    fullscreen: true,
    text: '拼命加载中'
  });
  return require;
});

instance.interceptors.response.use((response) => {
  loadingInstancce.close();
  const { config, data } = response;
  if (data.code === 200 && (config.method === 'post' || config.method === 'put' || config.method === 'delete')) {
    Notification.success({
      title: '操作成功'
    });
  } else if (data.code !== 200) {
    Notification.error({
      title: data.msg
    });
    if (data.code === 401) {
      // 需要登录
      const { origin, pathname, hash } = window.location;
      Notification.error({
        title: data.msg || '需要登录！'
      });
      if (!/login/.test(hash)) {
        window.location.href = `${origin}${pathname}/#/login`;
      }
    }
    return Promise.reject(data.msg);
  }
  return data;
}, (error) => {
  loadingInstancce.close();
  Notification.error({
    title: '请求失败'
  });
  return error;
});

export default instance;
