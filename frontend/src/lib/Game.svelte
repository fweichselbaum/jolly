<script lang="ts">
	import { updateState, type State } from "$lib/model";
	import { Action, HiddenSet, Set, Start, Update } from "$lib/pb/messages";
	import MainView from "$lib/views/MainView.svelte";
	import { onDestroy } from "svelte";
	import { toast } from "svelte-french-toast";

	type Props = {
		name: string;
		leave: () => void;
	};

	let { name, leave }: Props = $props();

	let loading = $state<boolean>(true);

	let game = $state<State>({
		player: {},
		drawDeck: HiddenSet.create(),
		foldDeck: Set.create(),
		hand: Set.create(),
		onGoing: false,
	});

	const ws = new WebSocket(`ws://localhost:8000/ws?name=${name}`);
	ws.binaryType = "arraybuffer";

	let resolve: Function;
	let reject: Function;
	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	toast.promise(promise, {
		loading: "Connecting...",
		success: `Connected as '${name}'`,
		error: "Connection failed",
	});

	ws.onmessage = (ev: MessageEvent<ArrayBuffer>) => {
		const msg = Update.decode(new Uint8Array(ev.data));
		console.log(msg)
		updateState(game, msg);
	};

	ws.onopen = () => {
		loading = false;
		resolve(1);
	};

	ws.onclose = () => {
		reject(1);
		leave();
	};

	function start() {
		const action: Action = {
			player: name,
			start: Start.create(),
		}
		ws.send(Action.encode(action).finish());
	}

	onDestroy(() => {
		ws.close();
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if !game.onGoing}
	<div class="flex flex-col gap-4 w-80 rounded-xl border p-8">
		<h1 class="text-3xl mb-4 text-center">Jolly 🃏</h1>

		<p>Connected player:</p>
		<ul class="list-disc pl-8">
			{#each Object.keys(game.player) as p (p)}
				<li class:highlighted={p == name}>{p}</li>
			{/each}
		</ul>
		<div class="flex justify-between">
			<button class="btn" onclick={leave}>Leave</button>
			<button class="btn btn-primary" onclick={start}>Start</button>
		</div>
	</div>
{:else}
	<MainView bind:game {name} />
{/if}

<style>
	.highlighted {
		@apply text-primary font-bold;
	}
</style>
