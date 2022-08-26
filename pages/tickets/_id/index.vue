<template>
	<div>
		<!-- this page is for the single ticket view -->
		<section>
			<!-- all ticket information -->
			<div align="center" class="ticket-status">
				<span :class="this.ticketStatus">status: {{ this.ticketStatus }}</span>
			</div>
			<h2>{{ this.ticket.subject }}</h2>
			<div class="stat-wrapper">
				<span>Posted on {{ formatDate(this.ticket.date) }}</span>

				<span
					>By
					<NuxtLink :to="'/users/' + this.rawId">{{
						this.ticket.userId
					}}</NuxtLink></span
				>
			</div>
			<div class="container">
				<div v-html="this.ticket.body"></div>
			</div>
			<!-- all ticket information -->

			<!-- list replies and switch between style for specific role -->
			<div class="reply-wrap">
				<h1>Replies ({{ this.replyCount }})</h1>
				<div class="ticket-replies" v-if="this.replyCount == 0">
					<p>There are currently no replies to this ticket.</p>
				</div>
				<ul class="reply-list" v-for="r in replies" :key="r._id">
					<li class="staff" v-if="r.role === 'staff'">
						<div class="reply-list-profile">
							<NuxtLink :to="'/users/' + r.userId">Staff</NuxtLink>
						</div>
						<div>
							<div v-html="r.body"></div>
						</div>
					</li>

					<li class="client" v-else>
						<div class="reply-list-profile">
							<NuxtLink :to="'/users/' + r.userId">{{ client }}</NuxtLink>
						</div>
						<div>
							<div v-html="r.body"></div>
						</div>
					</li>
				</ul>
			</div>
			<!-- list replies and switch between style for specific role -->

			<!-- show reply box if ticket status is set to open -->
			<div v-if="this.ticketStatus === 'open'">
				<h2>Submit a reply?</h2>
				<form @submit.prevent="submitReply()">
					<client-only>
						<editor
							id="ticketReply"
							v-model="ticketReply"
							api-key="cvikzv59hmrrcogef1m1uc2ii8ktfkickzq2c13lx2eitls3"
							:init="{
								height: 200,
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
					<base-button>Submit Reply</base-button>
				</form>
			</div>
			<!-- show reply box if ticket status is set to open -->

			<!-- otherwise show text that says it is closed -->
			<div v-else>
				<i>This ticket appears to be closed. You cannot make replies on it.</i>
			</div>
			<!-- otherwise show text that says it is closed -->

			<!-- button to re-open ticket if closed and to close ticket if it's open -->
			<div align="right">
				<form
					@submit.prevent="openTicket()"
					v-if="this.ticketStatus === 'closed'"
				>
					<base-button>Open Ticket</base-button>
				</form>
				<form
					@submit.prevent="closeTicket()"
					v-if="this.ticketStatus === 'open'"
				>
					<base-button>Close Ticket</base-button>
				</form>
			</div>
			<!-- button to re-open ticket if closed and to close ticket if it's open -->
		</section>
	</div>
</template>

<script>
	import axios from 'axios';
	import Editor from '@tinymce/tinymce-vue';
	export default {
		// editor component
		components: {
			editor: Editor,
		},
		data() {
			return {
				ticket: [],
				replies: [],
				ticketStatus: '',
				replyCount: '',
				rawId: '',
				replyUserId: '',
				replyRawId: '',
				role: this.$cookies.get('role'),
				client: '',
				ticketReply: '',
				replyDate: new Date(),
				replyId: this.$store.getters.userId,
				ticketId: this.$route.params.id,
			};
		},
		// add ticket info, reply info and user info to the created life cycle
		async created() {
			const ticketresponse = await axios.get(
				'/api/ticket/' + this.$route.params.id
			);
			this.rawId = ticketresponse.data.ticket.userId;
			this.ticketStatus = ticketresponse.data.ticket.status;
			this.ticket = ticketresponse.data.ticket;
			const replyresponse = await axios.get(
				'/api/ticket/replies/ticket/' + this.$route.params.id
			);
			this.replyCount = replyresponse.data.count;
			this.replies = replyresponse.data.replies;
			const userConvertResponse = await axios.get(
				'/api/user/' + this.ticket.userId
			);
			this.ticket.userId = userConvertResponse.data.user.name;
			this.client = userConvertResponse.data.user.name;
		},
		methods: {
			// submit ticket reply function
			async submitReply() {
				await axios
					.post('/api/ticket/replies/add', {
						date: this.replyDate,
						userId: this.replyId,
						ticketId: this.ticketId,
						role: this.$cookies.get('role'),
						body: this.ticketReply,
					})
					.then((response) => {
						this.replies.push(response.data);
						this.ticketReply = '';
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
			// close ticket function
			async closeTicket() {
				await axios
					.patch('/api/ticket/' + this.$route.params.id, {
						status: 'closed',
					})
					.then((response) => {
						if (response.status == 200) {
							this.$router.go();
						}
					})
					.catch((err) => {
						console.log('error', err);
						this.errorStatus = err.response.data.message;
					});
			},
			// reopen ticket function
			async openTicket() {
				await axios
					.patch('/api/ticket/' + this.$route.params.id, {
						status: 'open',
					})
					.then((response) => {
						if (response.status == 200) {
							this.$router.go();
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
	.stat-wrapper {
		text-align: center;
		padding: 10px 0;
	}
	.stat-wrapper span {
		background-color: #c85d1e;
		color: #fff;
		padding: 3px 10px;
		font-size: 0.8rem;
	}

	.stat-wrapper a {
		color: #fff;
	}

	.ticket-status {
		padding: 10px 0;
		text-transform: uppercase;
		font-size: 0.8rem;
	}

	form {
		width: 58%;
	}
</style>
