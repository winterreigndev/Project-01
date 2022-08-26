<template>
	<!-- Only allow staff to view this page -->
	<div v-if="this.$cookies.get('role') === 'staff'">
		<!-- Only allow staff to view this page -->
		<div>
			<h3>Active Packages</h3>

			<div v-for="i in package" :key="i._id">
				<ul class="open-tickets" v-if="i.status === 'active'">
					<li class="hint--bottom hint--info" :aria-label="i._id">
						<span class="material-icons the-id">label</span>
						<span class="id-text"><b>#ID</b></span>
					</li>
					<li>
						<b>{{ i.plan }}</b> - {{ i.domain }}
					</li>
					<li>
						<span :class="i.status">{{ i.status }}</span>
						<span class="deactivate" @click="deactivateHosting(i._id)"
							>deactivate</span
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				userId: this.$store.getters.userId,
				package: [],
				packageId: '',
			};
		},
		// add packages to created life cycle
		async created() {
			const listPackages = await axios.get('/api/package/list');
			this.package = listPackages.data.packages;
			this.packageCount = listPackages.data.count;
		},
		methods: {
			deactivateHosting(id) {
				// deactivate hosting by ID
				this.packageId = id;
				// console.log(this.packageId);
				this.$axios
					.patch('/package/' + this.packageId, {
						status: 'inactive',
					})
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
