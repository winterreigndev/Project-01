<template>
	<!-- Only allow staff to view this page -->
	<div v-if="this.$cookies.get('role') === 'staff'">
		<!-- Only allow staff to view this page -->
		<div>
			<section>
				<div class="content-wrap">
					<div>
						<!-- sidebar with site statistics -->
						<div class="side-box">
							<h3>Site Statistics</h3>
							<ul class="packages">
								<li>
									<b>{{ this.ticketCount }}</b> total tickets logged
								</li>
								<li>
									<b>{{ this.userCount }}</b> total users
								</li>
								<li>
									<b>{{ this.hostingCount }}</b> total hosting packages
								</li>
							</ul>
						</div>
						<!-- sidebar with site statistics -->
					</div>
					<div>
						<div class="content-box">
							<!-- admin navigation for sub pages -->
							<nav class="account-navigation">
								<ul>
									<li>
										<NuxtLink :to="'/admin/'" exact>Open Tickets</NuxtLink>
									</li>
									<li>
										<NuxtLink :to="'/admin/' + 'packages'" exact
											>Active Packages</NuxtLink
										>
									</li>
									<li>
										<NuxtLink :to="'/admin/' + 'inactive'" exact
											>Inactive Packages</NuxtLink
										>
									</li>
									<li>
										<NuxtLink :to="'/admin/' + 'users'" exact>Users</NuxtLink>
									</li>
								</ul>
							</nav>
							<!-- admin navigation for sub pages -->

							<!-- nuxt child which holds the sub pages in the navigation -->
							<NuxtChild />
							<!-- nuxt child which holds the sub pages in the navigation -->
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				userId: this.$store.getters.userId,
				ticket: [],
				ticketCount: '',
				userCount: '',
				hostingCount: '',
			};
		},
		// add counts to the create life cycle
		async created() {
			const tickets = await axios.get('/api/ticket/list');
			this.ticket = tickets.data.ticket;
			this.ticketCount = tickets.data.count;
			const listUsers = await axios.get('/api/user/users');
			this.userCount = listUsers.data.count;
			const listPackages = await axios.get('/api/package/list');
			this.hostingCount = listPackages.data.count;
		},
	};
</script>

<style scoped>
	.the-id {
		cursor: pointer;
		color: #c85d1e;
	}

	.id-text {
		position: relative;
		top: -5px;
		color: #c85d1e;
	}
	.nuxt-link-active {
		font-weight: bold;
		color: #c85d1e;
		border-bottom: 8px solid #c85d1e;
	}
</style>
