// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import './style.scss';
import Mock from './mock';
import OpQuillEditor from './components/op-quill-editor';

Mock.bootstrap();

Vue.use((() => {
  OpQuillEditor.install = (iVue) => {
    iVue.component(OpQuillEditor.name, OpQuillEditor);
  };
  return OpQuillEditor;
})());
Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
