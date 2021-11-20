<script lang="ts">
	import { walletMachine } from '$lib/authMachine';
	import ConnectWallet from '$lib/components/ConnectWallet.svelte';
	import GifGrid from '$lib/components/GifGrid.svelte';
	import SubmitGif from '$lib/components/SubmitGif.svelte';

	import { useMachine } from '@xstate/svelte';
	import { onMount } from 'svelte';

	const TWITTER_HANDLE = 'fawaztsa';
	const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

	const { state, send } = useMachine(walletMachine);

	// Uncomment the line below to see how the state machine transitions!
	$: console.log($state.value);
	$: console.log($state.context);

	onMount(() => {
		send('CHECK_WALLET_EXISTENCE');
	});
</script>

<div class="App">
	<div class="container">
		<div class="header-container">
			<div class="header">
				<img
					alt="a cartoon frog pogging"
					src="https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/2x"
				/>
				Pepe Gifs
				<img
					alt="a cartoon frog pogging"
					src="https://cdn.betterttv.net/emote/58ae8407ff7b7276f8e594f2/2x"
				/>
			</div>
			<p class="sub-text">The spiciest pepe gifs ✨</p>
		</div>

		{#if $state.value === 'idle'}
			<div class="sub-text">SECRET MESSAGE!</div>
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
		{:else if $state.value === 'systemProgramInitSuccess'}
			<div class="sub-text">Wallet Connected! Address: {$state.context.wallet.publicKey.toString()}</div>
			<SubmitGif />
			<GifGrid />
		{:else if $state.value === 'systemProgramInitError'}
			<div class="sub-text">Whoops, something went wrong from our side, inform me @fawaztsa on twitter</div>
		{/if}
		<div class="footer-container">
			<img alt="Twitter Logo" class="twitter-logo" src="/twitter-logo.svg" />
			<a class="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer"
				>{`built by @${TWITTER_HANDLE}`}</a
			>
		</div>
	</div>
</div>

<style lang="scss">
	$background: #1a202c;
	// $background: #a833b9;

	.App {
		height: 100vh;
		background-color: $background;
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
