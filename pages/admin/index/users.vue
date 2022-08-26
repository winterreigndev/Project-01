<template>
	<!-- Only allow staff to view this page -->
	<div v-if="this.$cookies.get('role') === 'staff'">
		<!-- Only allow staff to view this page -->
		<div>
			<h3>All Users</h3>
			<div v-for="i in user" :key="i._id">
				<ul class="open-tickets">
					<li class="hint--bottom hint--info" :aria-label="i._id">
						<span class="material-icons the-id">label</span>
						<span class="id-text"><b>#ID</b></span>
					</li>
					<li>
						<NuxtLink :to="'/user/' + i._id">{{ i.email }}</NuxtLink>
					</li>
					<li>
						<span class="delete-user" @click="removeUser(i._id)"
							>remove user</span
						>
					</li>
				</ul>
			</div>
			<base-button :to="'/admin/newuser'" link>Create New User</base-button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				userId: this.$store.getters.userId,
				user: [],
				removeUserId: '',
			};
		},
		// add users list to created cycle
		async created() {
			const listUsers = await axios.get('/api/user/users');
			this.user = listUsers.data.users;
		},
		methods: {
			// remove user by ID
			removeUser(id) {
				this.removeUserId = id;
				this.$axios
					.delete('/user/' + this.removeUserId, {})
					.then(() => {
						this.$router.go();
					})
					.catch((error) => {
						console.log(error);
					});
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
