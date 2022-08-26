<template>
	<div>
		<section>
			<div v-if="error.statusCode === 404">
				<h1>Page not found.</h1>
				<p>If you think this is incorrect, please contact the webmaster.</p>
				<br />
				<NuxtLink to="/">Go back to the homepage?</NuxtLink>
			</div>
			<div v-else-if="error.statusCode === 500">
				<h1>Page not found.</h1>
				<p>If you think this is incorrect, please contact the webmaster.</p>
				<br />
				<NuxtLink to="/">Go back to the homepage?</NuxtLink>
			</div>
			<div v-else>
				<h1>An error occurred - {{ error.statusCode }}</h1>
				<br />
				<NuxtLink to="/">Go back to the homepage?</NuxtLink>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		props: ['error'],
		layout: 'error', // you can set a custom layout for the error page
	};
</script>

<style scoped>
	section {
		height: 60vh;
	}
</style>
