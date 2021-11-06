<script lang="ts">
	import { walletMachine } from '$lib/authMachine';
	import ConnectWallet from '$lib/components/ConnectWallet.svelte';

	import { useMachine } from '@xstate/svelte';
	import { onMount } from 'svelte';

	const TWITTER_HANDLE = 'fawaztsa';
	const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

	const { state, send } = useMachine(walletMachine);

    // Uncomment the line below to see how the state machine transitions!
	// $: console.log($state);

	onMount(() => {
		send('CHECK_WALLET_EXISTENCE');
	});
</script>

<div class="App">
	<div class="container">
		<div class="header-container">
			<p class="header">🖼 GIF Portal</p>
			<p class="sub-text">View your GIF collection in the metaverse ✨</p>
		</div>

		{#if $state.value === 'idle'}
			<div class="sub-text">
				SECRET MESSAGE! if you're seeing this you probably have a bad pc or internet lmao
			</div>
		{:else if $state.value === 'checkingWalletExistence'}
			<div class="sub-text">Checking that you have Phantom Wallet...</div>
		{:else if $state.value === 'walletExists'}
			<ConnectWallet {send} />
		{:else if $state.value === 'walletConnectionFailed'}
			<div class="sub-text">Whoops! something went wrong, care to try again?</div>
			<ConnectWallet {send} />
		{:else if $state.value === 'walletDoesNotExist'}
			<div class="sub-text">
				To view this page, you'll need <a href="https://phantom.app/">Phantom Wallet</a>
			</div>
		{:else if $state.value === 'walletConnected'}
			<div class="sub-text">Wallet Connected! Address: {$state.context.wallet}</div>
		{/if}

		<div class="footer-container">
			<img alt="Twitter Logo" class="twitter-logo" src="/twitter-logo.svg" />
			<a class="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer"
				>{`built by @${TWITTER_HANDLE}`}</a
			>
		</div>
	</div>
</div>

<style>
	.App {
		height: 100vh;
		background-color: #1a202c;
		overflow: scroll;
		text-align: center;
	}

	a {
		color: inherit;
	}

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 30px 0 30px;
	}

	.authed-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 30px;
	}

	.header {
		margin: 0;
		font-size: 50px;
		font-weight: bold;
		color: white;
	}

	.sub-text {
		font-size: 25px;
		color: white;
	}

	.gradient-text {
		background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.submit-gif-button {
		background: -webkit-linear-gradient(left, #4e44ce, #35aee2);
		background-size: 200% 200%;
		animation: gradient-animation 4s ease infinite;
		margin-left: 10px;
	}

	.footer-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		padding-bottom: 45px;
	}

	.twitter-logo {
		width: 35px;
		height: 35px;
	}

	.footer-text {
		color: white;
		font-size: 16px;
		font-weight: bold;
	}

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

	.connected-container input[type='text'] {
		display: inline-block;
		color: white;
		padding: 10px;
		width: 50%;
		height: 60px;
		font-size: 16px;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.25);
		border: none;
		border-radius: 10px;
		margin: 50px auto;
	}

	.connected-container button {
		height: 50px;
	}
</style>
