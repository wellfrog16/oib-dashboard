import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login/login';
import NotFound from '@/pages/common/404';
import WorksList from '@/pages/works/list/list';

Vue.use(Router);

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hidden: true
      }
    },
    {
      path: '/404',
      component: NotFound,
      name: '404',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      component: root,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'works',
          component: root,
          name: '项目',
          iconClass: 'el-icon-message',
          children: [
            {
              path: 'list',
              name: '列表',
              component: WorksList,
              imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite%2Fbackground.jpg'
            }
          ]
        }
      ]
    }
  ],
});
