<template>
	<!-- Only allow staff to view this page -->
	<div v-if="this.$cookies.get('role') === 'staff'">
		<!-- Only allow staff to view this page -->
		<form @submit.prevent="registerUser">
			<p>To manually register a new user, please use the form below.</p>
			<div>
				<label for="name">Name: </label>
				<input type="text" id="name" v-model.trim="name" />
			</div>
			<div>
				<label for="email">Email Address: </label>
				<input type="email" id="email" v-model.trim="email" />
			</div>
			<div>
				<label for="role">Role (staff or leave blank): </label>
				<input type="role" id="role" v-model.trim="role" />
			</div>
			<div>
				<label for="password">Password: </label>
				<input type="password" id="password" v-model.trim="password" />
			</div>
			<p class="error" v-if="this.errorStatus">{{ this.errorStatus }}</p>
			<div><base-button>Register Account</base-button></div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				email: '',
				password: '',
				errorStatus: '',
				name: '',
				role: '',
				dateOfRegistration: new Date().toLocaleDateString('en-US'),
			};
		},
		methods: {
			// register a new user
			async registerUser() {
				await axios
					.post('/api/user/register', {
						email: this.email,
						name: this.name,
						password: this.password,
						role: this.role,
						dateJoined: this.dateOfRegistration,
					})
					.then((response) => {
						this.results = response.data.results;
						if (response.status == 201) {
							this.$router.push('/admin/users');
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
		},
	};
</script>
