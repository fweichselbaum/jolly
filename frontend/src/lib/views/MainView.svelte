<script lang="ts">
	import CardBack from "$lib/cards/CardBack.svelte";
	import type { State } from "$lib/model";
	import PlayerView from "$lib/views/PlayerView.svelte";
	import SetView from "$lib/views/SetView.svelte";

	type Props = {
		name: string;
		game: State;
	};

	let { name, game = $bindable() }: Props = $props();

	let names = $derived(Object.keys(game.player));
	let idx = $state(0);

	function prev() {
		idx = (idx - 1 + names.length) % names.length;
	}
	function next() {
		idx = (idx + 1) % names.length;
	}
</script>

<div class="h-full p-8 flex w-full flex-col justify-between">
	<div class="flex flex-col gap-8 items-center">
		<div class="flex gap-4 items-center">
			<CardBack />
			<SetView set={game.foldDeck} />
		</div>

		<div role="tablist" class="tabs tabs-boxed">
			{#each names as n, i (i)}
				<button
					role="tab"
					class="tab"
					class:tab-active={n == names[idx]}
					onclick={() => (idx = i)}
				>
					{n}
				</button>
			{/each}
		</div>
	</div>
	<div class="w-full flex justify-between items-center">
		<button class="btn btn-circle" onclick={prev}> ← </button>
		<PlayerView
			playerName={names[idx]}
			bind:playerInfo={game.player[names[idx]]}
		/>
		<button class="btn btn-circle" onclick={next}> → </button>
	</div>

	<div class="flex items-center justify-between">
		<p>Playing as <span class="text-primary font-bold">{name}</span></p>
		<SetView set={game.hand} />
		<button class="btn btn-primary btn-circle"> + </button>
	</div>
</div>
