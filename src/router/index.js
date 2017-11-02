import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/login/login';
import NotFound from '@/pages/common/404';
import WorksList from '@/pages/works/list/list';
import WorksCreateDetail from '@/pages/works/create-detail/create-detail';

import NewsCreateDetail from '@/pages/news/create-detail/create-detail';
import NewsList from '@/pages/news/list/list';

import ServicesCreateDetail from '@/pages/services/create-detail/create-detail';
import ServicesList from '@/pages/services/list/list';

import AboutDetailEdit from '@/pages/about/detail-edit/detail-edit';

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
              component: WorksCreateDetail,
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
              component: WorksCreateDetail,
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
              component: NewsCreateDetail,
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
              component: NewsCreateDetail,
              meta: {
                index: 'news'
              }
            }
          ]
        },
        {
          path: 'services',
          component: root,
          name: 'services',
          children: [
            {
              path: 'create',
              name: 'services.create',
              label: '新建',
              component: ServicesCreateDetail,
              meta: {
                index: 'services'
              }
            },
            {
              path: 'list',
              name: 'services.list',
              label: '列表',
              component: ServicesList,
              meta: {
                index: 'services'
              }
            },
            {
              path: 'detail/:id',
              name: 'services.detail',
              label: '详情',
              component: ServicesCreateDetail,
              meta: {
                index: 'services'
              }
            }
          ]
        },
        {
          path: 'about',
          component: root,
          name: 'about',
          children: [
            {
              path: 'detail',
              name: 'about.detail',
              label: '详情',
              component: AboutDetailEdit,
              meta: {
                index: 'about'
              }
            }
          ]
        }
      ]
    }
  ],
});
