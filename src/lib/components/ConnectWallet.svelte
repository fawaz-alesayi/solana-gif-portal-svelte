<script>
	export let send;
</script>

<button class="cta-button connect-wallet-button" on:click={() => send('CONNECT_WALLET')}>
	Connect to Wallet
</button>

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

	.connect-wallet-button {
		background: -webkit-linear-gradient(left, #60c657, #35aee2);
		background-size: 200% 200%;
		animation: gradient-animation 4s ease infinite;
        margin-top: 25px;
	}
</style>
