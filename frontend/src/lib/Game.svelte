<script lang="ts">
	import type { Message } from "$lib/messages";
	import type { State } from "$lib/model";
	import MainView from "$lib/views/MainView.svelte";
	import { onDestroy } from "svelte";
	import { toast } from "svelte-french-toast";

	type Props = {
		name: string;
		joined: boolean;
	};

	let { name, joined } = $props<Props>();

	let loading = $state(true);

	let game = $state<State>({
		player: {},
		drawDeck: [],
		foldDeck: [],
		onGoing: false,
	});

	$inspect(game)

	let ws = new WebSocket(`ws://localhost:8000/ws?name=${name}`);

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

	ws.onmessage = (ev) => {
		const msg: Message = JSON.parse(ev.data);
		if (msg.type == "state") {
			game = msg.data;
		}
	};

	ws.onopen = () => {
		loading = false;
		resolve(1);
	};

	ws.onclose = () => {
		joined = false;
		reject(1);
	};

	const start = () => {
		const msg: Message = {
			type: "control",
			data: "start",
		};
		ws.send(JSON.stringify(msg));
	};

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
	<MainView bind:game={game} {name} />
{/if}

<style>
	.highlighted {
		@apply text-primary font-bold;
	}
</style>