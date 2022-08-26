import Vue from 'vue';
Vue.mixin({
	data() {
		return {
			selection: 'none',
			selectionIcon: 'shopping_cart',
			isDisabled: false,
		};
	},
	// switch between icons depending on if cart is empty or not
	mounted() {
		if (localStorage.getItem('cart')) {
			this.selection = localStorage.getItem('cart');
		}
		if (this.selection == 'none') {
			this.selectionIcon = 'shopping_cart';
		} else {
			this.selectionIcon = 'shopping_cart_checkout';
		}
	},
	methods: {
		// order now function that takes the value of package clicked
		orderNow(value) {
			// take value from button click and set selection to the package id clicked
			// then store that value in localstorage and a cookie to keep information for cart
			const pack = value;
			if (pack === 1) {
				this.selection = pack;
				localStorage.setItem('cart', pack);
				this.$cookies.set('cart', pack);
				this.isDisabled = true;
			} else if (pack === 2) {
				this.selection = pack;
				localStorage.setItem('cart', pack);
				this.$cookies.set('cart', pack);
				this.isDisabled = true;
			} else if (pack === 3) {
				this.selection = pack;
				localStorage.setItem('cart', pack);
				this.$cookies.set('cart', pack);
				this.isDisabled = true;
			} else if (pack === 4) {
				this.selection = pack;
				localStorage.setItem('cart', pack);
				this.$cookies.set('cart', pack);
				this.isDisabled = true;
			}
		},
	},
});
