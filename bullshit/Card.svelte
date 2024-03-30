<script lang="ts">
	import { cardValue, type Card } from "../model";

	type Props = { card: Card };

	const { card } = $props<Props>();
	const letter = $derived(cardValue(card));
</script>

<div class="h-20 w-14 bg-white rounded-2xl border-white border-4
relative inline-flex flex-col items-center justify-center
text-3xl font-bold select-none shadow-xl"
class:striped={card.o} title={card.o}>
	{#if card.v == 1}
		<img src="/joker.png" alt="Joker"/>
	{:else if card.s == "C"}
		<p class="text-black">{letter}</p>
		<img src="/icon_clubs.svg" alt="Clubs" class="w-2/3">
	{:else if card.s == "D"}
		<p class="text-[#f40000]">{letter}</p>
		<img src="/icon_diamonds.svg" alt="Diamonds" class="w-2/3">
	{:else if card.s == "H"}
		<p class="text-[#f40000]">{letter}</p>
		<img src="/icon_hearts.svg" alt="Hearts" class="w-2/3">
	{:else}
		<p class="text-black">{letter}</p>
		<img src="/icon_spades.svg" alt="Spades" class="w-2/3">
	{/if}
</div>

<style>
	.striped {
		background: repeating-linear-gradient(
			45deg,
			white 0px,
			white 10px,
			#ddd 10px,
			#ddd 20px
		);
	}
</style>
