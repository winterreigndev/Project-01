<template>
	<div>
		<base-form></base-form>
	</div>
</template>

<script></script>

<style scoped>
	.the-cart {
		width: 80%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 50% 50%;
		column-gap: 0.5em;
	}
	.the-cart div {
		background-color: #eee;
		padding: 10px 5px;
	}

	.order-table {
		width: 100%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 33% 33% 33%;
		column-gap: 0.5em;
		text-align: center;
	}

	.order-table div {
		background-color: #f9f9fd;
	}

	form {
		width: 80%;
	}
</style>
