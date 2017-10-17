import axios from 'axios';
import { Loading, Notification } from 'element-ui';

const instance = axios.create({
  // baseURL: 'http://www.tron-m.com/oib-api',
  baseURL: 'http://localhost:9999/oib-api',
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
