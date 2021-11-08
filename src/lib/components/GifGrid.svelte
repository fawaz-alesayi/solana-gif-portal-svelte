<script lang="ts">
	import { gifService } from '$lib/gifMachines';
	import { onMount } from 'svelte';

	// Uncomment line below to see state transitions!
	// $: console.log($gifService.value);

	onMount(() => {
		console.log("onMount => gifService.send('LOAD_GIFS')");
		gifService.send('LOAD_GIFS');
	});
</script>

{#if $gifService.value === 'loaded'}
	<div class="connected-container">
		<div class="gif-grid">
			{#each $gifService.context.gifUrls as gifUrl}
				<div class="gif-item">
					<img src={gifUrl} alt={gifUrl} />
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.gif-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		grid-gap: 1.5rem;
		justify-items: center;
		margin: 0;
		padding: 0;
	}

	.gif-grid .gif-item {
		display: flex;
		flex-direction: column;
		position: relative;
		justify-self: center;
		align-self: center;
	}

	.gif-item img {
		width: 100%;
		height: 300px;
		border-radius: 10px;
		object-fit: cover;
	}
</style>
