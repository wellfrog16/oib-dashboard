import oib from '../axios-instance/oib';

const base = '/product';

const get = params => oib.get(`${base}/get.do`, params).then(res => res.data);

const destroy = params => oib.get(`${base}/delete.do`, params).then(res => res.data);

const list = params => oib.post(`${base}/list.do`, params).then(res => res.data);

const save = params => oib.post(`${base}/save.do`, params).then(res => res.data);

export default {
  get,
  destroy,
  list,
  save
};
