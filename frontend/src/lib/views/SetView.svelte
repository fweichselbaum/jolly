<script lang="ts">
    import CardFront from "$lib/cards/CardFront.svelte";
    import type { Card, Set } from "$lib/pb/messages";
    import { type DndEvent } from "svelte-dnd-action";

    type Props = {
        set: Set;
    };

    const { set = $bindable() }: Props = $props();

    function insert(e: CustomEvent<DndEvent<Card>>) {
        set.cards = e.detail.items;
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="flex items-center justify-center rounded-xl border p-4 min-h-28 min-w-24"
>
    {#each set.cards as card (card.id)}
        <CardFront {card} />
    {/each}
</div>
