<script lang="ts">
    import { Symbol, type Card } from "$lib/pb/messages";
    
    type Props = { card: Card };

    const { card }: Props = $props();

    const letter = $derived(cardValue(card));

    function cardValue(card: Card): string {
        switch (card.value) {
            case 11: return "J";
            case 12: return "Q";
            case 13: return "K";
            case 14: return "A";
        }
        return card.value.toString();
    }
</script>

<div
    class="h-20 w-14 bg-white rounded-2xl border-white border-4
relative inline-flex flex-col items-center justify-center
text-3xl font-bold select-none shadow-xl"
    class:striped={card.owner}
    title={`${card.id}: ${card.owner}`}
>
    {#if card.value == 1}
        <img src="/joker.png" alt="Joker" />
    {:else if card.symbol == Symbol.Clubs}
        <p class="text-black">{letter}</p>
        <img src="/icon_clubs.svg" alt="Clubs" class="w-2/3" />
    {:else if card.symbol == Symbol.Diamonds}
        <p class="text-[#f40000]">{letter}</p>
        <img src="/icon_diamonds.svg" alt="Diamonds" class="w-2/3" />
    {:else if card.symbol == Symbol.Hearts}
        <p class="text-[#f40000]">{letter}</p>
        <img src="/icon_hearts.svg" alt="Hearts" class="w-2/3" />
    {:else}
        <p class="text-black">{letter}</p>
        <img src="/icon_spades.svg" alt="Spades" class="w-2/3" />
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
