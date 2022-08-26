export default {
	nuxtServerInit({ commit }, { req, app }) {
		const token = app.$cookies.get('token');
		const userId = app.$cookies.get('userId');
		// store token and userid in the store
		const payload = {
			token,
			userId,
		};
		commit('setUser', payload);
	},
};
