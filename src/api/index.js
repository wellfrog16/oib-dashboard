import oib from './axios-instance/oib';

const requestLogin = params => oib.post('/login', params).then(res => res.data);

const requestLogout = params => oib.post('/logout', params).then(res => res.data);

export default {
  requestLogin,
  requestLogout
};
