import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/equipment/:id',
      name: 'equipment',
      component: () => import(/* webpackChunkName: 'equipment' */ './views/Equipment.vue'),
    },
    {
      path: '/equipment-sorted/:id',
      name: 'equipmentSorted',
      component: () => import(/* webpackChunkName: 'equipmentSorted' */ './views/EquipmentSorted.vue'),
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
      redirect: '/equipment/ball',
    }, 
    {
      path: '/',
      redirect: '',
    },
    {
      name: 'err404',
      path: '*',
      component: () => import(/* webpackChunkName: 'error404' */ './views/Error404.vue'),
    },
  ],
});
