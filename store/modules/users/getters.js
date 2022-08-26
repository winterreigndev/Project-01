export default {
	// id of user logged in
	userId(state) {
		return state.userId;
	},
	// jwt token of user logged in
	token(state) {
		return state.token;
	},
	// if the user is authenticated
	isAuthenticated(state) {
		return !!state.token;
	},
};
