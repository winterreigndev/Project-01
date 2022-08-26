export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Hosting Solutions',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'a project by winterreign',
			},
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
			},
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~static/style/main.css', '~static/style/hint.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~plugins/isAuthenticated.js' },
		{ src: '~plugins/logOut.js' },
		{ src: '~plugins/cartFunctions.js' },
		{ src: '~plugins/formatDate.js' },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {
		dirs: ['~/components', '~/components/layout', '~/components/ui'],
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		['@nuxtjs/axios'],
		['@nuxt/image'],
		['@nuxtjs/auth-next'],
		['cookie-universal-nuxt', { alias: 'cookies', parseJSON: false }],
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: process.env.API_URL,
	},

	auth: {
		strategies: {
			local: {
				token: {
					required: false,
					type: false,
				},
				endpoints: {
					login: {
						url: '/api/user/login',
						method: 'post',
					},
				},
			},
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	// Server Middleware
	serverMiddleware: [{ path: 'api/', handler: '~/api/index.js' }],
};
