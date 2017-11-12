import oib from '../axios-instance/oib';

const base = '/about';

const get = params => oib.get(`${base}`, { params }).then(res => res.data);

const save = data => oib.post(`${base}`, data).then(res => res.data);

const getSliders = () => oib.get('customer-sliders').then(res => res.data);

const saveSliders = data => oib.post('customer-sliders', data).then(res => res.data);

export default {
  get,
  save,
  getSliders,
  saveSliders
};
