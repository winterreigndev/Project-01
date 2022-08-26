<template>
	<div>
		<!-- shows all active packages of a user -->
		<h3>Active Packages</h3>
		<div v-for="item in package" :key="item.id">
			<ul class="open-tickets" v-if="item.status === 'active'">
				<li class="hint--bottom hint--info" :aria-label="item._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<li>
					<b>{{ item.plan }}</b> - {{ item.domain }}
				</li>
				<li>
					<span :class="item.status">{{ item.status }}</span>
				</li>
			</ul>
		</div>
		<!-- shows all active packages of a user -->

		<!-- shows all inactive packages of a user -->
		<h3>Inactive Packages</h3>
		<div v-for="item in package" :key="item.id">
			<ul class="open-tickets" v-if="item.status === 'inactive'">
				<li class="hint--bottom hint--info" :aria-label="item._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<li>
					<b>{{ item.plan }}</b> - {{ item.domain }}
				</li>
				<li>
					<span :class="item.status">{{ item.status }}</span>
				</li>
			</ul>
		</div>
		<!-- shows all inactive packages of a user -->

		<!-- a button to lead the user to the packages page to order more -->
		<base-button link to="/packages/">
			<i class="fa fa-cart-plus"></i>
			Order More
		</base-button>
		<!-- a button to lead the user to the packages page to order more -->
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		// props to get pageID to get user information from parent
		props: ['pageId'],
		data() {
			return {
				userId: this.$store.getters.userId,
				user: [],
				package: [],
			};
		},
		// add user and package info to the create life cycle
		async created() {
			const response = await axios.get('/api/user/' + this.$props.pageId);
			this.user = response.data.user;
			const res = await axios.get('/api/package/user/' + this.$props.pageId);
			this.package = res.data.packages;
		},
		methods: {
			// edit profile function that leads the user to the edit profile page
			editProfile() {
				this.$router.push('/users/' + this.userId + '/settings/');
			},
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
</style>
