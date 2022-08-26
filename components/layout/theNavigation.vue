<template>
	<div>
		<!--start-main-navigation-->
		<div id="navigation" class="desktop">
			<div class="logo"><NuxtLink to="/#home">HS</NuxtLink></div>
			<div class="nav">
				<NuxtLink to="/#home">Homepage</NuxtLink>
				<NuxtLink to="/#features">Features</NuxtLink>
				<NuxtLink to="/#pricing">Pricing</NuxtLink>
				<NuxtLink to="/register" v-if="!isAuthenticated">Register</NuxtLink>
				<NuxtLink to="/login" v-if="!isAuthenticated">Login</NuxtLink>
				<NuxtLink to="/contact-us">Contact Us</NuxtLink>
				<!-- start logged in only -->
				<NuxtLink
					:to="'/users/' + this.$store.getters.userId"
					v-if="isAuthenticated"
					>Profile</NuxtLink
				>
				<NuxtLink :to="'/admin/'" v-if="this.$cookies.get('role') === 'staff'"
					>Staff</NuxtLink
				>
				<NuxtLink to="" @click.native="logout()" v-if="isAuthenticated"
					>Logout</NuxtLink
				>
				<!-- end logged in only -->
				<NuxtLink to="/checkout"
					><span class="material-icons" v-if="this.selection == 'none'">
						{{ selectionIcon }}
					</span>
					<span class="material-icons" v-if="this.selection !== 'none'">
						{{ selectionIcon }}
					</span>
				</NuxtLink>
			</div>
		</div>
		<!--end-main-navigation-->

		<!--start mobile navigation-->
		<div id="navigation" class="mobile">
			<div class="logo"><NuxtLink to="/#home">HS</NuxtLink></div>
			<div class="nav">
				<label for="toggle">
					<client-only
						><svg viewBox="0 0 100 80" width="40" height="40">
							<rect width="100" height="20"></rect>
							<rect y="30" width="100" height="20"></rect>
							<rect y="60" width="100" height="20"></rect>
						</svg>
						<svg viewBox="0 0 100 80" width="40" height="40">
							>
						</svg></client-only
					></label
				>
				<input type="checkbox" id="toggle" />
				<div class="menu">
					<li><NuxtLink to="/#home">Homepage</NuxtLink></li>
					<li><NuxtLink to="/#features">Features</NuxtLink></li>
					<li><NuxtLink to="/#pricing">Pricing</NuxtLink></li>
					<li v-if="!isAuthenticated">
						<NuxtLink to="/register">Register</NuxtLink>
					</li>
					<li v-if="!isAuthenticated">
						<NuxtLink to="/login">Login</NuxtLink>
					</li>
					<li><NuxtLink to="/contact-us">Contact Us</NuxtLink></li>
					<!-- start logged in only -->
					<li v-if="isAuthenticated">
						<NuxtLink :to="'/users/' + this.$store.getters.userId"
							>Profile</NuxtLink
						>
					</li>
					<li v-if="this.$cookies.get('role') === 'staff'">
						<NuxtLink :to="'/admin/'">Staff</NuxtLink>
					</li>
					<li v-if="isAuthenticated">
						<NuxtLink to="" @click.native="logout()">Logout</NuxtLink>
					</li>
					<!-- end logged in only -->
					<li>
						<NuxtLink to="/checkout"
							><span class="material-icons" v-if="this.selection == 'none'">
								{{ selectionIcon }}
							</span>
							<span class="material-icons" v-if="this.selection !== 'none'">
								{{ selectionIcon }}
							</span>
						</NuxtLink>
					</li>
				</div>
			</div>
		</div>
		<!--end mobile navigation-->
	</div>
</template>

<style scoped>
	.material-icons {
		position: relative;
		top: 5px;
	}
</style>
