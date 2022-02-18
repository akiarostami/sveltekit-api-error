<script context="module">
	export function load({ error, status }) {
		let code = status;
		let message = error.message;
		let pageNotFound = status === 404;

		return {
			props: { code, message, pageNotFound },
		};
	}
</script>

<script>
	export let pageNotFound;
	export let message;
	export let code;
</script>

<main class="mx-auto mt-16 max-w-xl rounded-lg border border-base-300 bg-base-200 p-8 text-center">
	{#if pageNotFound}
		<h1 class="pb-2">404</h1>
		<h2 class="border-b-4 border-brand pb-12">Page Not Found</h2>

		<p class="py-12 text-base text-base-content text-opacity-50">The page you’re looking for doesn’t exist.</p>
	{:else}
		<h1 class="pb-4">Error ({code})</h1>
		<h3 class="border-b-4 border-brand pb-12">{message}</h3>

		<p class="py-12 text-base text-base-content text-opacity-50">We're sorry for the inconvenience.</p>
	{/if}
	<a href="/" class="btn btn-primary">Go Back</a>
</main>
