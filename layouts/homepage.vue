<template>
	<div>
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

					<!--start-header-content-->
					<div class="header-content">
						<div>
							<div class="title-wrap">
								<div class="site-title">Hosting Solutions</div>
								<div class="site-slogan">
									Worldwide premium hosting provider
								</div>
								<div class="site-description">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum
									dolore eu fugiat nulla pariatur. Excepteur sint occaecat
									cupidatat non proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</div>
								<div class="social">
									Follow us on social media ―
									<a href="#"><i class="fa fa-twitter-square"></i></a>
									<a href="#"><i class="fa fa-facebook-square"></i></a>
								</div>
							</div>
						</div>
						<div>
							<client-only><serverSVG /></client-only>
						</div>
					</div>
					<!--end-header-content-->
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
</template>

<script>
	export default {
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
		},
	};
</script>

<style scoped>
	.header {
		height: 80vh;
	}
</style>
