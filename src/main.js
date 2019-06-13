import Vue from 'vue';
require('babel-core/register');
require('babel-polyfill');

import './plugins/axios';
import './plugins/lodash';
import './plugins/vuetify'; 

import App from './App.vue';
import router from './router';
import store from './store';


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
