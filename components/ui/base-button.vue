<template>
	<!-- Use button if it is not a link and the button should be disabled -->
	<button v-if="!link && disabled" :class="mode" disabled>
		<slot></slot>
	</button>
	<!-- Use button if it is not a link and the button should be disabled -->

	<!-- Use button if it is not a link and the button is not disabled -->
	<button v-else-if="!link && !disabled" :class="mode">
		<slot></slot>
	</button>

	<!-- Use if it is a link instead of a button -->
	<router-link v-else :to="to" :class="mode">
		<slot></slot>
	</router-link>
	<!-- Use if it is a link instead of a button -->
</template>

<script>
	export default {
		props: {
			// class for the button
			mode: {
				type: String,
				required: false,
				default: null,
			},
			// if button is a link or not
			link: {
				type: Boolean,
				required: false,
				default: false,
			},
			// to where button goes
			to: {
				type: String,
				required: false,
				default: '/',
			},
			// if button is disabled
			disabled: {
				type: Boolean,
				required: false,
				default: false,
			},
		},
	};
</script>

<style scoped>
	button,
	a {
		background-color: #c85d1e;
		border: 2px solid #c85d1e;
		display: inline-block;
		font-size: 0.9rem;
		color: #fff;
		padding: 10px 15px;
		margin: 10px;
		border-radius: 20px;
		cursor: pointer;
		transition: 0.4s;
	}
	a:hover,
	a:active,
	button:hover,
	button:active {
		background-color: #dd783d;
		border: 2px solid #dd783d;
	}
	.outline {
		background-color: transparent;
		border-color: #dd783d;
		color: #dd783d;
	}
	.outline:hover,
	.outline:active {
		background-color: #dd783d;
		color: #fff;
	}
	.inactive {
		opacity: 0.5;
		filter: grayscale(100);
	}
</style>
