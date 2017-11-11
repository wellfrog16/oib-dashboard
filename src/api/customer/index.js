import oib from '../axios-instance/oib';

const base = '/customer';

const get = (id, params) => oib.get(`${base}/${id}`, { params }).then(res => res.data);

const destroy = (id, params) => oib.delete(`${base}/${id}`, { params }).then(res => res.data);

const list = params => oib.get(`${base}s`, { params }).then(res => res.data);

const create = params => oib.post(`${base}`, params).then(res => res.data);

const save = (id, params) => oib.put(`${base}/${id}`, params).then(res => res.data);

const getSliders = () => oib.get('customer-sliders').then(res => res.data);

const saveSliders = data => oib.post('customer-sliders', data).then(res => res.data);

export default {
  get,
  destroy,
  list,
  create,
  save,
  getSliders,
  saveSliders
};
