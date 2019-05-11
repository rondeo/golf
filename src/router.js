import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/ball',
      name: 'ball',
      component: () => import(/* webpackChunkName: 'ball' */ './views/Ball.vue'),
    },
    {
      path: '/iron',
      name: 'iron',
      component: () => import(/* webpackChunkName: 'iron' */ './views/Iron.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: 'home' */ './views/Home.vue'),
    },
    {
      path: '/',
      redirect: '',
    },
    {
      name: 'err404',
      path: '*',
      component: () => import(/* webpackChunkName: "error404" */ './views/Error404.vue'),
    },
  ],
});
