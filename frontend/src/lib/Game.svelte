<script lang="ts">
	import { updateState, type State } from "$lib/model.svelte";
	import { onDestroy } from "svelte";
	import { toast } from "svelte-french-toast";
	import { HiddenSet, Set, Start, Update } from "./pb/messages";

	type Props = {
		name: string;
		joined: boolean;
	};

	let { name, joined } = $props<Props>();

	let loading = $state(true);

	// let game = $state<State>({
	// 	player: {},
	// 	drawDeck: [],
	// 	foldDeck: [],
	// 	onGoing: false,
	// });

	let game = $state<State>({
		player: {},
		drawDeck: HiddenSet.create(),
		foldDeck: Set.create(),
		hand: Set.create(),
	})

	$inspect(game)

	let ws = new WebSocket(`ws://localhost:8000/ws?name=${name}`);
	ws.binaryType = "arraybuffer";

	const { promise, resolve, reject } = Promise.withResolvers();

	toast.promise(promise, {
		loading: "Connecting...",
		success: `Connected as '${name}'`,
		error: "Connection failed",
	});

	ws.onmessage = (ev) => {
		const msg = Update.decode(ev.data);
		console.log(msg);
		updateState(game, msg);
	};

	ws.onopen = () => {
		loading = false;
		resolve(null);
	};

	ws.onclose = () => {
		joined = false;
		reject(null);
	};

	const start = () => {
		const msg = Start.create();
		const bytes = Start.encode(msg).finish();
		ws.send(bytes);
	};

	onDestroy(() => {
		ws.close();
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if !game.currentPlayer}
	<div class="flex flex-col gap-4 w-80 rounded-xl border p-8">
		<h1 class="text-3xl mb-4 text-center">Jolly 🃏</h1>

		<p>Connected player:</p>
		<ul class="list-disc pl-8">
			{#each Object.keys(game.player) as p (p)}
				<li>
					<span class:highlighted={p == name}>{p}</span>
				</li>
			{/each}
		</ul>
		<div class="flex justify-between">
			<button class="btn" on:click={() => (joined = false)}>Leave</button>
			<button class="btn btn-primary" on:click={start}>Start</button>
		</div>
	</div>
{:else}
	<!-- <MainView bind:game={game} {name} /> -->
{/if}

<style>
	.highlighted {
		@apply text-primary font-bold;
	}
</style>