<script lang="ts">
	import Set from "$lib/Set.svelte";
	import { type Player } from "$lib/model";

	type Props = {
		player: Player;
	};

	let { player } = $props<Props>();

</script>

<div class="flex flex-col gap-2 items-center justify-start">
	<i>Player View of {player.name}</i>

	<div class="flex gap-2">
	{#each player.cards as set, i (i)} 
		{#if i != 0}
			<Set bind:cards={set} />
		{/if}
	{/each}</div>
</div>
