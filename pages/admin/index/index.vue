<template>
	<!-- Only allow staff to view this page -->
	<div v-if="this.$cookies.get('role') === 'staff'">
		<!-- Only allow staff to view this page -->
		<h3>Open Tickets</h3>
		<div v-for="t in ticket" :key="t._id">
			<ul class="open-tickets" v-if="t.status === 'open'">
				<li class="hint--bottom hint--info" :aria-label="t._id">
					<span class="material-icons the-id">label</span>
					<span class="id-text"><b>#ID</b></span>
				</li>
				<li>
					<NuxtLink :to="'/tickets/' + t._id">{{ t.subject }}</NuxtLink>
				</li>
				<li>
					<span :class="t.status">{{ t.status }}</span>
				</li>
			</ul>
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
			};
		},
		// add tickets to created life cycle
		async created() {
			const tickets = await axios.get('/api/ticket/list');
			this.ticket = tickets.data.ticket;
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
