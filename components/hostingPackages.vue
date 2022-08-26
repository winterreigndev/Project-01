<template>
	<div>
		<!-- start show message if there is something in their cart -->
		<div v-if="this.selection !== 'none'">
			<div class="alert-success">
				You currently have <strong>hosting package #{{ selection }}</strong> in
				your cart. <NuxtLink to="/checkout">View your cart now.</NuxtLink>
			</div>
		</div>
		<!-- end show message if there is something in their cart -->

		<div class="prices-wrap">
			<!-- hosting package -->
			<div class="price">
				<span class="small-text">hosting package #1</span>
				<h2>Nisl nunc</h2>
				<ul>
					<li>Starting at <b>3.99</b> a month</li>
					<li>Velit egestas dui</li>
					<li>Eu lobortis elementum</li>
					<li>Vitae justo eget</li>
					<li>Ut porttitor leo</li>
				</ul>
				<div
					v-if="
						this.$route.path === '/packages' ||
						this.$route.path === '/packages/'
					"
				>
					<base-button
						@click.native="orderNow(1)"
						v-if="this.selection == 'none'"
						>Order Now</base-button
					>
					<base-button
						@click.native="orderNow(1)"
						v-if="this.selection !== 'none'"
						mode="inactive"
						disabled
						>Order Now</base-button
					>
				</div>
				<div v-else>
					<base-button link :to="'/packages/'">More Information</base-button>
				</div>
			</div>
			<!-- hosting package -->

			<!-- hosting package -->
			<div class="price">
				<span class="small-text">hosting package #2</span>
				<h2>Sagittis nisl</h2>
				<ul>
					<li>Starting at <b>5.99</b> a month</li>
					<li>Velit egestas dui</li>
					<li>Eu lobortis elementum</li>
					<li>Vitae justo eget</li>
					<li>Ut porttitor leo</li>
				</ul>
				<div
					v-if="
						this.$route.path === '/packages' ||
						this.$route.path === '/packages/'
					"
				>
					<base-button
						@click.native="orderNow(2)"
						v-if="this.selection == 'none'"
						>Order Now</base-button
					>
					<base-button
						@click.native="orderNow(2)"
						v-if="this.selection !== 'none'"
						mode="inactive"
						disabled
						>Order Now</base-button
					>
				</div>
				<div v-else>
					<base-button link :to="'/packages/'">More Information</base-button>
				</div>
			</div>
			<!-- hosting package -->

			<!-- hosting package -->
			<div class="price">
				<span class="small-text">hosting package #3</span>
				<h2>Nisl nunc</h2>
				<ul>
					<li>Starting at <b>8.99</b> a month</li>
					<li>Velit egestas dui</li>
					<li>Eu lobortis elementum</li>
					<li>Vitae justo eget</li>
					<li>Ut porttitor leo</li>
				</ul>
				<div
					v-if="
						this.$route.path === '/packages' ||
						this.$route.path === '/packages/'
					"
				>
					<base-button
						@click.native="orderNow(3)"
						v-if="this.selection == 'none'"
						>Order Now</base-button
					>
					<base-button
						@click.native="orderNow(3)"
						v-if="this.selection !== 'none'"
						mode="inactive"
						disabled
						>Order Now</base-button
					>
				</div>
				<div v-else>
					<base-button link :to="'/packages/'">More Information</base-button>
				</div>
			</div>
			<!-- hosting package -->

			<!-- hosting package -->
			<div class="price">
				<span class="small-text">hosting package #4</span>
				<h2>Sagittis nisl</h2>
				<ul>
					<li>Starting at <b>12.99</b> a month</li>
					<li>Velit egestas dui</li>
					<li>Eu lobortis elementum</li>
					<li>Vitae justo eget</li>
					<li>Ut porttitor leo</li>
				</ul>
				<div
					v-if="
						this.$route.path === '/packages' ||
						this.$route.path === '/packages/'
					"
				>
					<base-button
						@click.native="orderNow(4)"
						v-if="this.selection == 'none'"
						>Order Now</base-button
					>
					<base-button
						@click.native="orderNow(4)"
						v-if="this.selection !== 'none'"
						mode="inactive"
						disabled
						>Order Now</base-button
					>
				</div>
				<div v-else>
					<base-button link :to="'/packages/'">More Information</base-button>
				</div>
			</div>
			<!-- hosting package -->
		</div>
	</div>
</template>

<script>
	export default {};
</script>
