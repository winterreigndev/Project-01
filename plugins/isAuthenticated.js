import Vue from 'vue';
Vue.mixin({
	computed: {
		// authenticate a user if they are logged in and information is in the store
		isAuthenticated() {
			return this.$store.getters.isAuthenticated;
		},
	},
});
