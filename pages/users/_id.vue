<template>
	<div>
		<section>
			<!-- show a success alert if the user updated their profile successfully from settings page -->
			<div class="alert-success" v-if="$route.params.updated == 'yes'">
				Profile information updated successfully.
			</div>
			<!-- show a success alert if the user updated their profile successfully from settings page -->

			<div class="content-wrap">
				<div>
					<div class="side-box">
						<p v-if="this.user.icon">
							<img :src="this.user.icon" width="200px" />
						</p>
						<p v-else>
							<img src="https://i.imgur.com/1erwgAG.jpg" width="200px" />
						</p>
						<p class="user-information">
							<i class="fa fa-user"></i>
							{{ this.user.name }}
						</p>
						<p class="user-information">
							<i class="fa fa-envelope"></i> {{ this.user.email }}
						</p>
						<p
							class="settings"
							@click="editProfile"
							v-if="this.userId === this.$route.params.id"
						>
							<i class="fa fa-pencil"></i> Edit Profile Settings
						</p>
					</div>
					<div class="side-box">
						<h3>Statistics</h3>
						<ul class="packages">
							<li>
								<b>Hostee Since:</b>
								{{ formatDate(this.user.dateJoined) }}
							</li>
							<li><b>Total Hosting Packages:</b> {{ count }}</li>
							<li><b>Total Tickets Created:</b> {{ ticketCount }}</li>
						</ul>
					</div>
				</div>
				<div>
					<div class="content-box">
						<nav class="account-navigation">
							<ul>
								<li>
									<NuxtLink :to="'/users/' + this.$route.params.id" exact
										>Open Tickets</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										:to="'/users/' + this.$route.params.id + '/closed'"
										exact
										>Closed Tickets</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										:to="'/users/' + this.$route.params.id + '/packages'"
										exact
										>Hosting Packages</NuxtLink
									>
								</li>
							</ul>
						</nav>
						<NuxtChild :packageData="this.package" :pageId="this.pageId" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				userId: this.$store.getters.userId,
				user: [],
				package: [],
				ticket: [],
				ticketCount: '',
				count: '',
				pageId: this.$route.params.id,
			};
		},
		// add user, package and ticket info to the created life cycle
		async created() {
			const response = await axios.get('/api/user/' + this.$route.params.id);
			this.user = response.data.user;
			const res = await axios.get('/api/package/user/' + this.$route.params.id);
			this.package = res.data.packages;
			this.count = res.data.count;
			const tickets = await axios.get(
				'/api/ticket/user/' + this.$route.params.id
			);
			this.ticket = tickets.data.tickets;
			this.ticketCount = tickets.data.count;
		},
		methods: {
			// edit profile function for button
			editProfile() {
				this.$router.push('/users/' + this.userId + '/settings/');
			},
		},
	};
</script>

<style scoped>
	.nuxt-link-active {
		font-weight: bold;
		color: #c85d1e;
		border-bottom: 8px solid #c85d1e;
	}
</style>
