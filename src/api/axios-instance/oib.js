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
  return response.data;
}, (error) => {
  loadingInstancce.close();
  Notification.error({
    title: '请求失败'
  });
  return error;
});

export default instance;
