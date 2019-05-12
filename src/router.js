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
      path: '/driver',
      name: 'driver',
      component: () => import(/* webpackChunkName: 'driver' */ './views/Driver.vue'),
    },
    {
      path: '/glove',
      name: 'glove',
      component: () => import(/* webpackChunkName: 'glove' */ './views/Glove.vue'),
    },
    {
      path: '/iron',
      name: 'iron',
      component: () => import(/* webpackChunkName: 'iron' */ './views/Iron.vue'),
    },
    {
      path: '/putter',
      name: 'putter',
      component: () => import(/* webpackChunkName: 'putter' */ './views/Putter.vue'),
    },
    {
      path: '/sandWedge',
      name: 'sandWedge',
      component: () => import(/* webpackChunkName: 'sandWedge' */ './views/SandWedge.vue'),
    },

    {
      path: '/myEquipment',
      name: 'myEquipment',
      component: () => import(/* webpackChunkName: 'myEquipment' */ './views/MyEquipment.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: 'about' */ './views/About.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import(/* webpackChunkName: 'contacts' */ './views/Contacts.vue'),
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
