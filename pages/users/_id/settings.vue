<template>
	<!-- only display if the userID in their cookies matches the params id for their page -->
	<div v-if="this.uID === this.$route.params.id">
		<form class="profile-settings form-settings" @submit="updateProfile">
			<h2>User Profile Settings</h2>
			<!-- Note: display current settings -->
			<hr />
			<div>
				<label><strong>Unique User ID:</strong> {{ uID }}</label>
			</div>
			<div>
				<p v-if="this.image">
					<img :src="this.image" width="200px" />
				</p>
				<p v-else>
					<img src="https://i.imgur.com/1erwgAG.jpg" width="200px" />
				</p>
				<label
					><strong
						>Profile Image URL (please upload to free image host):</strong
					>
				</label>
				<input v-model="image" />
			</div>
			<div>
				<label><strong>Name:</strong> {{ name }}</label>
				<input v-model="name" :maxlength="max" />
				<p v-if="alertMsg" class="alert">{{ alertMsg }}</p>
			</div>
			<div>
				<label><strong>Email Address:</strong> {{ email }}</label>
				<input v-model="email" type="email" />
			</div>
			<div>
				<label>Preferred Payment: </label> <br />
				<span class="user-information" v-if="editMethod === false"
					><b>{{ preferredPayment || 'None yet' }}</b>
				</span>
				<div v-if="editMethod === true" class="toggle-payment">
					<input v-model="preferredPayment" />
				</div>
				<br />
				<p class="payment">
					<a @click.prevent="editPaymentMethod()">{{ editText }}</a>
					<a @click.prevent="removeMethod()">Remove</a>
				</p>
			</div>
			<br />
			<base-button>Save Profile</base-button>
		</form>
	</div>
	<!-- only display if the userID in their cookies matches the params id for their page -->

	<!-- otherwise show error message -->
	<div v-else>
		<p>You do not have the permissions to view this page.</p>
	</div>
	<!-- otherwise show error message -->
</template>

<script>
	export default {
		async asyncData(context) {
			const { data } = await context.$axios.get(
				'/user/' + context.route.params.id
			);
			return {
				profile: data,
			};
		},
		data() {
			return {
				image: null,
				name: null,
				email: null,
				preferredPayment: null,
				max: 50,
				uID: this.$store.getters.userId,
				alertMsg: '',
				editMethod: false,
				editText: 'Edit',
			};
		},
		mounted() {
			this.fillFormData();
		},
		watch: {
			// show error message if user reaches 50 character limit for name
			name(text) {
				if (text?.length === 50) {
					this.alertMsg = 'Limited to 50 characters only.';
				} else {
					this.alertMsg = '';
				}
			},
		},
		methods: {
			// pre-fill the input fields with user data saved in database
			fillFormData() {
				this.image = this.profile.user.icon;
				this.name = this.profile.user.name;
				this.email = this.profile.user.email;
				this.preferredPayment = this.profile.user.preferredPayment;
			},
			// remove payment method
			removeMethod() {
				this.preferredPayment = '';
			},
			// edit payment method
			editPaymentMethod() {
				if (this.editMethod === false) {
					this.editMethod = true;
					this.editText = 'Done';
				} else {
					this.editMethod = false;
					this.editText = 'Edit';
				}
			},
			// update user profile function that sends info to the database
			updateProfile() {
				this.$axios
					.patch('/user/' + this.$route.params.id, {
						name: this.name,
						email: this.email,
						icon: this.icon,
						preferredPayment: this.preferredPayment,
					})
					.then((response) => {
						console.log(response);
						this.$router.push({
							name: 'users-id',
							params: { updated: 'yes', id: this.$route.params.id },
						});
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
	};
</script>

<style scoped>
	.alert {
		color: red !important;
	}
	.toggle-payment input {
		margin: 0 !important;
	}
</style>
