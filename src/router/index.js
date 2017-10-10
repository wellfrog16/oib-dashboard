import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login/login';
import NotFound from '@/pages/common/404';
import WorksCreate from '@/pages/works/create/create';
import WorksList from '@/pages/works/list/list';
import WorksDetail from '@/pages/works/detail/detail';

import NewsCreate from '@/pages/news/create/create';
import NewsDetail from '@/pages/news/detail/detail';
import NewsList from '@/pages/news/list/list';

// import aboutDetailEdit

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
          name: 'works',
          children: [
            {
              path: 'create',
              name: 'works.create',
              label: '新建',
              component: WorksCreate,
              meta: {
                index: 'works'
              }
            },
            {
              path: 'list',
              name: 'works.list',
              label: '列表',
              component: WorksList,
              meta: {
                index: 'works'
              }
            },
            {
              path: 'detail/:id',
              name: 'works.detail',
              label: '详情',
              component: WorksDetail,
              meta: {
                index: 'works'
              }
            }
          ]
        },
        {
          path: 'news',
          component: root,
          name: 'news',
          children: [
            {
              path: 'create',
              name: 'news.create',
              label: '新建',
              component: NewsCreate,
              meta: {
                index: 'news'
              }
            },
            {
              path: 'list',
              name: 'news.list',
              label: '列表',
              component: NewsList,
              meta: {
                index: 'news'
              }
            },
            {
              path: 'detail/:id',
              name: 'news.detail',
              label: '详情',
              component: NewsDetail,
              meta: {
                index: 'news'
              }
            }
          ]
        }
      ]
    }
  ],
});
