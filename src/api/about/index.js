import oib from '../axios-instance/oib';

const base = '/about';

const get = params => oib.get(`${base}`, { params }).then(res => res.data);

// const destroy = (id, params) => oib.delete(`${base}/${id}`, { params }).then(res => res.data);
//
// const list = params => oib.get(`${base}s`, { params }).then(res => res.data);
//
// const create = params => oib.post(`${base}`, params).then(res => res.data);

const save = params => oib.put(`${base}`, params).then(res => res.data);

export default {
  get,
  // destroy,
  // list,
  // create,
  save
};
