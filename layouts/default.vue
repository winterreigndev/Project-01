<template>
	<div>
		<div class="loading-page" v-if="loading">
			<p>Loading...</p>
		</div>
		<div v-else>
			<!--start-header-->
			<the-header>
				<div class="header">
					<slot>
						<!--start-header-svg-for-design-->
						<headerBG />
						<page-divider></page-divider>
						<!--end-header-svg-for-design-->

						<!--start-navigation-with-logo-->
						<the-navigation></the-navigation>
						<!--end-navigation-with-logo-->
					</slot>
				</div>
			</the-header>
			<!--end-header-->

			<!--start-nuxt-->
			<Nuxt />
			<!--end-nuxt-->
			<!--start-footer-->
			<the-footer />
			<!--end-footer-->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
			};
		},
		methods: {
			scrollnav() {
				// control the scrollbar color once you scroll in browser
				var y = window.scrollY;
				if (y > 1) {
					document.getElementById('navigation').style.backgroundColor =
						'var(--dark-blue)';
				} else {
					document.getElementById('navigation').style.backgroundColor = 'unset';
				}
			},
		},
		mounted() {
			// scrollbar event listener
			window.addEventListener('scroll', this.scrollnav);
			this.loading = false;
		},
	};
</script>

<style scoped>
	.header {
		height: 20vh;
	}
	.loading-page {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.8);
		text-align: center;
		padding-top: 200px;
		font-size: 30px;
		font-family: sans-serif;
	}
</style>
