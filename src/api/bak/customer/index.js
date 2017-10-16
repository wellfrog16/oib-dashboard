import oib from '../../axios-instance/oib';

const base = '/customer';

const get = params => oib.get(`${base}/get.do`, { params }).then(res => res.result);

const destroy = params => oib.get(`${base}/delete.do`, { params }).then(res => res.result);

const list = params => oib.post(`${base}/list.do`, Object.assign(params || {}, {
  page: 1, rows: 20
})).then(res => res.result);

const save = params => oib.post(`${base}/save.do`, params).then(res => res.result);

export default {
  get,
  destroy,
  list,
  save
};
