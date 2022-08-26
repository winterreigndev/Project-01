<template>
	<div>
		<!-- shows all closed tickets that a user has created -->
		<h3>Closed Tickets</h3>
		<div v-for="i in ticket" :key="i._id">
			<ul class="open-tickets" v-if="i.status === 'closed'">
				<li class="hint--bottom hint--info" :aria-label="i._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<li>
					<NuxtLink :to="'/tickets/' + i._id">{{ i.subject }}</NuxtLink>
				</li>
				<li>
					<span :class="i.status">{{ i.status }}</span>
				</li>
			</ul>
		</div>
		<base-button link to="/tickets/create/">Open Ticket</base-button>
		<!-- shows all closed tickets that a user has created -->
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
				ticket: [],
				ticketCount: '',
			};
		},
		// add user and ticket info to the create life cycle
		async created() {
			const response = await axios.get('/api/user/' + this.$props.pageId);
			this.user = response.data.user;
			const tickets = await axios.get('/api/ticket/user/' + this.$props.pageId);
			this.ticket = tickets.data.tickets;
			this.ticketCount = tickets.data.count;
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
