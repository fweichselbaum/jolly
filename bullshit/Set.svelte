<script lang="ts">
	import Card from "$lib/cards/Card.svelte";
	import { cardSortFunc, type Card as CardType } from "$lib/model";
	import { dndzone, type Options as DndOptions } from "svelte-dnd-action";

	type Props = {
		cards: CardType[];
		mode?: "sequence" | "symbol" | "fold";
		dndOptions?: Partial<DndOptions>;
	};

	let { cards, mode, dndOptions } = $props<Props>();

	const dndOpts = Object.assign({
		flipDurationMs: 150,
		dropTargetClasses: ["border-primary"]
	} satisfies Partial<DndOptions>, dndOptions);

</script>

<div
	use:dndzone={{ items: cards, flipDurationMs: 150 }}
	on:consider={(e) => {
		cards = e.detail.items;
		cards.sort(cardSortFunc);
	}}
	on:finalize={(e) => {
		cards = e.detail.items;
		cards.sort(cardSortFunc);
	}}
	class="flex items-center justify-center rounded-xl border p-4 min-h-28 min-w-24"
>
	{#each cards as c (c.id)}
		<Card card={c} />
	{/each}
</div>
