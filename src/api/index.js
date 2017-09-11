import axios from 'axios';

const base = '';

const requestLogin = params => axios.post(`${base}/login`, params).then(res => res.data);

export default {
  requestLogin
};
