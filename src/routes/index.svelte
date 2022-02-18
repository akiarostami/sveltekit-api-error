<script>
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { post } from '$utils/api.js';

	let email = '';
	let error = null;
	let message = '';

	const submit = async () => {
		const res = await post('code', { email });
		error = res.error;
		message = res.message;
	};
</script>

<h2>Sign in</h2>
<form on:submit|preventDefault={submit}>
	<div>
		<label for="email">Email address:</label>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="email"
			name="email"
			id="email"
			placeholder="test@domain.com"
			bind:value={email}
			aria-invalid={error ? true : null}
			autofocus
		/>
		{#if error}
			<small>{error}</small>
		{/if}
		{#if message}
			<mark>{message}</mark>
		{/if}
	</div>
	<button type="submit">Get My Code</button>
</form>