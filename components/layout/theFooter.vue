<template>
	<div>
		<!-- start the footer -->
		<footer>
			<div class="footer-links">
				<!-- start the Services section in footer -->
				<div>
					<b>Our Services</b>
					<ul>
						<li>
							<NuxtLink to="/packages"
								>Eu lobortis elementum - Nisl nunc</NuxtLink
							>
						</li>
						<li>
							<NuxtLink to="/packages"
								>Velit egestas dui - Sagittis nisl</NuxtLink
							>
						</li>
						<li>
							<NuxtLink to="/packages"
								>Eu lobortis elementum - Nisl nunc</NuxtLink
							>
						</li>
						<li>
							<NuxtLink to="/packages"
								>Velit egestas dui - Sagittis nisl</NuxtLink
							>
						</li>
					</ul>
				</div>
				<!-- end the Services section in footer -->

				<!-- start the Company Information section in footer -->
				<div>
					<b>Our Company</b>
					<ul>
						<li><NuxtLink to="/about-us">About Hosting Solutions</NuxtLink></li>
						<li><NuxtLink to="/our-datacenters">Our Datacenters</NuxtLink></li>
						<li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
						<li>
							<NuxtLink to="/terms-of-service">Terms of Service</NuxtLink>
						</li>
					</ul>
				</div>
				<!-- end the Company Information section in footer -->

				<!-- start the Support section in footer -->
				<div>
					<b>Support</b>
					<ul>
						<li><NuxtLink to="/contact-us">Contact Us</NuxtLink></li>
						<li v-if="!isAuthenticated">
							<NuxtLink to="/login">Submit A Ticket</NuxtLink>
						</li>
						<li v-if="isAuthenticated">
							<NuxtLink to="/tickets/create/"
								>Submit A Ticket (ticket)</NuxtLink
							>
						</li>
						<li v-if="!isAuthenticated">
							<NuxtLink to="/login">Login</NuxtLink>
						</li>
						<li v-if="!isAuthenticated">
							<NuxtLink to="/register">Register</NuxtLink>
						</li>
					</ul>
				</div>
				<!-- End the Support section in footer -->
			</div>
			<!-- start current year in footer -->
			&copy; {{ currentYear }} Hosting Solutions Inc.
			<!-- end current year in footer -->
		</footer>
		<!-- end the footer -->
	</div>
</template>

<script>
	export default {
		// display the current year in footer without doing it manually
		data() {
			return {
				currentYear: new Date().getFullYear(),
			};
		},
	};
</script>
