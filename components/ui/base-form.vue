<template>
	<div>
		<!--Start Registration Form-->
		<div v-if="register">
			<section>
				<h2>Register</h2>
				<form @submit.prevent="registerUser">
					<p>
						To create an account with <b>Hosting Solutions</b>, please fill out
						the form below with valid information and click the
						<i>"Register Account"</i> button.
					</p>
					<div>
						<label for="name">Name: </label>
						<input type="text" id="name" v-model.trim="name" />
					</div>
					<div>
						<label for="email">Email Address: </label>
						<input type="email" id="email" v-model.trim="email" />
					</div>
					<div>
						<label for="password">Password: </label>
						<input type="password" id="password" v-model.trim="password" />
					</div>
					<p class="error" v-if="this.errorStatus">{{ this.errorStatus }}</p>
					<div><base-button>Register Account</base-button></div>
				</form>
			</section>
		</div>
		<!--End Registration Form-->

		<!--Start Login Form-->
		<div v-else-if="login">
			<section>
				<h2>Login</h2>
				<form @submit.prevent="userLogin">
					<p v-if="this.$route.params.id === 1">
						<span class="message"
							>Registration Success! Please log in with your account
							information.</span
						>
					</p>
					<p>
						Please fill out the form below with your valid account information.
						If you do not have an account with us, please
						<nuxt-link to="/register">register an account here</nuxt-link>
					</p>
					<div>
						<label for="email">Email Address: </label>
						<input type="email" id="email" v-model.trim="email" />
					</div>
					<div>
						<label for="password">Password: </label>
						<input type="password" id="password" v-model.trim="password" />
					</div>
					<p class="error" v-if="this.errorStatus">{{ this.errorStatus }}</p>
					<div><base-button>Login</base-button></div>
					<hr />
					<p>
						If you are having issues loggin into your account, please contact us
						as soon as possible by
						<nuxt-link to="/contact-us">filling out the form here</nuxt-link>.
						In the subject field; please state "Issues logging in to account".
					</p>
				</form>
			</section>
		</div>
		<!--End Login Form-->

		<!---Developer Note: PROFILE SETTINGS form is located in pages/users/_id/settings.vue-->

		<!--Start Create Ticket Form-->
		<div v-else-if="createTicket">
				<h2>Create Ticket</h2>
				<hr />
				<form align="center" @submit.prevent="openTicket()">
					<div>
						<label for="subject"><b>Subject: </b></label>
						<input id="subject" v-model.trim="subject" />
					</div>
					<div>
						<label for="domain"><b>Domain: </b></label>
						<input id="domain" v-model.trim="domain" />
					</div>
					<div>
						<label for="body"><b>Message: </b></label>
						<client-only placeholder="Loading...">
							<editor
								id="body"
								v-model="body"
								api-key="cvikzv59hmrrcogef1m1uc2ii8ktfkickzq2c13lx2eitls3"
								:init="{
									height: 500,
									plugins: [
										'advlist',
										'autolink',
										'lists',
										'link',
										'image',
										'charmap',
										'preview',
										'anchor',
										'searchreplace',
										'visualblocks',
										'fullscreen',
										'insertdatetime',
										'media',
										'table',
										'help',
										'wordcount',
									],
								}"
						/></client-only>
					</div>
					<base-button>Create Ticket</base-button>
				</form>
		</div>
		<!--End Create Ticket Form-->

		<!---Developer Note: TICKET REPLY form is located in pages/tickets/_id/index.vue-->

		<!--Start Order Form-->
		<div v-else>
		<section>
			<h2><span>Checkout</span></h2>
			<div v-if="this.itemInCart != null" class="full-content content-box">
				<div class="the-cart">
					<div>
						<strong>Order For:</strong> Hosting package #{{ itemInCart }}
					</div>
					<div><strong>Price:</strong> ${{ thePrice }}</div>
				</div>
				<hr />
				<div v-if="isAuthenticated">
					<p>
						To set up the account for your order, please fill out the form
						below:
					</p>
					<p>
						Form to create new hosting package for user<br />
						<form @submit.prevent="registerHosting">
						<div>
						<h1 align="center">Hosting Package #{{ itemInCart }} - ${{ thePrice }}</h1>
						</div>
						<div>
							<p align="center">The following cannot be changed, please open a ticket for changes or increases.</p>
						</div>
						<div class="order-table">
							<div><strong>Billing Cycle:</strong>  {{ billingCycle }}</div>
							<div><strong>Space Quota:</strong>  {{ spaceQuota }}</div>
							<div><strong>Bandwidth:</strong>  {{ bandwidth }}</div>
						</div>
						<div align="center">
						<label for="domain"><strong>Domain:</strong>  </label>
						<input type="text" id="domain" v-model="domain"/>
						</div>
						<div align="center">
						<label for="paymentMethod"><strong>Payment:</strong>  </label>
						<input type="text" id="paymentMethod" v-model="paymentMethod"/>
						</div>
						<div align="center">
							<base-button>Order Package</base-button> 
							<base-button @click.native="clearCart">Clear Cart</base-button>
						</div>
						</form>
							
					</p>
				</div>
				<div v-else>
					<p>
						You are currently not signed in. To place an order, you are required
						to have an existing account.
					</p>
					<div align="center">
						<base-button link :to="'/login/'"
							>Already a User? Login</base-button
						>
						<base-button link :to="'/register/'"
							>Need an account? Register</base-button
						>
					</div>
				</div>
			</div>

			<div v-else class="full-content content-box">
				<div align="center">
					You currently do not have any hosting packages in your cart.
				</div>
			</div>
		</section>
		</div>
		<!--End Order Form-->
	</div>
</template>

<script>
	import Editor from '@tinymce/tinymce-vue';
	import axios from 'axios';
	export default {
		components: {
			editor: Editor,
		},
		props: {
			login: {
				type: Boolean,
				required: false,
				default: false,
			},
			register: {
				type: Boolean,
				required: false,
				default: false,
			},
			contact: {
				type: Boolean,
				required: false,
				default: false,
			},
			createTicket: {
				type: Boolean,
				required: false,
				default: false,
			},
			ticketReply: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
		data() {
			return {
				// all of the data needed in every form in this component
				email: '',
				password: '',
				errorStatus: '',
				userId: '',
				name: '',
				error: false,
				dateOfRegistration: new Date().toLocaleDateString('en-US'),
				itemInCart: null,
				thePrice: null,
				hostingPackage: null,
				dateOfCreation: new Date(),
				domain: '',
				orderUserId: this.$store.getters.userId,
				billingCycle: 'Monthly',
				spaceQuota: '50GB',
				bandwidth: 'Unlimited',
				paymentMethod: '',
				createFormUserId: this.$store.getters.userId,
				subject: '',
				body: '',
				status: 'open',
				date: new Date().toLocaleDateString('en-US'),
			};
		},

		mounted() {
			// all cart logic / checkout uses
		if (this.$route.path === '/checkout' || this.$route.path === '/checkout/') {
			if (localStorage.getItem('cart')) {
				this.itemInCart = localStorage.getItem('cart');
			}
			if (this.itemInCart == 1) {
				this.hostingPackage = 'Hosting Package #1';
				this.thePrice = '3.99';
			} else if (this.itemInCart == 2) {
				this.hostingPackage = 'Hosting Package #2';
				this.thePrice = '5.99';
			} else if (this.itemInCart == 3) {
				this.hostingPackage = 'Hosting Package #3';
				this.thePrice = '8.99';
			} else if (this.itemInCart == 4) {
				this.hostingPackage = 'Hosting Package #4';
				this.thePrice = '12.99';
			} else {
				this.hostingPackage = null;
				this.thePrice = '0.00';
			}

					}
		},
		methods: {
			// open a ticket
			async openTicket() {
				await axios
					.post('/api/ticket/create', {
						domain: this.domain,
						userId: this.createFormUserId,
						userName: this.userName,
						subject: this.subject,
						body: this.body,
						status: this.status,
						date: this.date,
					})
					.then((response) => {
						this.results = response.data.results;
						if (response.status == 201) {
							this.$router.push('/users/' + this.createFormUserId);
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
			// login user
			async userLogin() {
				await axios
					.post('/api/user/login', {
						email: this.email,
						password: this.password,
					})
					.then((response) => {
						const responseData = response.data;
						console.log(response.data);
						const expiresIn = +responseData.expiresIn * 5000;
						const expirationDate = new Date().getTime() + expiresIn;
						localStorage.setItem('token', responseData.token);
						localStorage.setItem('userId', responseData.userId);
						localStorage.setItem('email', responseData.email);
						localStorage.setItem('role', responseData.role);
						localStorage.setItem('tokenExpiration', expirationDate);
						this.$cookies.set('token', responseData.token);
						this.$cookies.set('userId', responseData.userId);
						this.$cookies.set('email', responseData.email);
						this.$cookies.set('role', responseData.role);
						this.$cookies.set('tokenExpiration', expirationDate);
						this.$store.commit('setUser', {
							token: responseData.token,
							userId: responseData.userId,
						});
						this.userId = responseData.userId;
						if (response.status == 200) {
							this.$router.push('/users/' + this.userId);
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
			// register user
			async registerUser() {
				await axios
					.post('/api/user/register', {
						email: this.email,
						name: this.name,
						password: this.password,
						dateJoined: this.dateOfRegistration,
					})
					.then((response) => {
						this.results = response.data.results;
						if (response.status == 201) {
							this.$router.push({ name: 'login', params: { id: 1 } });
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
			// clear the cart / empty cart
			clearCart() {
				localStorage.removeItem('cart');
				this.$cookies.remove('cart');
				this.$router.go();
			},
			// register a hosting package
			async registerHosting() {
				await axios
					.post('/api/package/create', {
						date: this.dateOfCreation,
						domain: this.domain,
						userId: this.orderUserId,
						plan: this.hostingPackage,
						billingCycle: this.billingCycle,
						spaceQuota: this.spaceQuota,
						bandwidth: this.bandwidth,
						status: 'active',
					})
					.then((response) => {
						localStorage.removeItem('cart');
						this.$cookies.remove('cart');
						this.results = response.data.results;
						if (response.status == 201) {
							this.$router.push('/users/' + this.orderUserId);
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

<style scoped>
	section {
		height: 60vh;
	}
</style>
