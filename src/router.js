import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/ball',
      name: 'ball',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/driver',
      name: 'driver',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/glove',
      name: 'glove',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/iron',
      name: 'iron',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/putter',
      name: 'putter',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/sandWedge',
      name: 'sandWedge',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
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
