import Vuex from 'vuex';
import Vue from 'vue';
import usersModule from './modules/users/index.js';

Vue.use(Vuex);

export default () =>
	new Vuex.Store({
		state: () => ({}),
		mutations: {},
		actions: {},
		modules: {
			auth: usersModule,
		},
	});
