import Vue from 'vue';
Vue.mixin({
	methods: {
		// format all dates when used
		formatDate(date) {
			const options = {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			};
			return new Date(date).toLocaleDateString('en', options);
		},
	},
});
