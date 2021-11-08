<script>
	import { gifService } from '$lib/gifMachines';
	let value;
</script>

<input bind:value type="text" placeholder="Enter gif link!" />
<button
	class="cta-button submit-gif-button"
	on:click={() => gifService.send({ type: 'SUBMIT_GIF', value })}>Submit</button
>
<div>{value}</div>

<style>
	.cta-button {
		height: 45px;
		border: 0;
		width: auto;
		padding-left: 40px;
		padding-right: 40px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 16px;
		font-weight: bold;
		color: white;
	}

	.submit-gif-button {
		background: -webkit-linear-gradient(left, #4e44ce, #35aee2);
		background-size: 200% 200%;
		animation: gradient-animation 4s ease infinite;
		margin-left: 10px;
	}
</style>
