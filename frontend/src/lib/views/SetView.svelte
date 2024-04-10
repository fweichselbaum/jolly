<script lang="ts">
    import CardFront from "$lib/cards/CardFront.svelte";
    import type { Set } from "$lib/pb/messages";

    type Props = {
        set: Set;
    };

    const { set = $bindable() }: Props = $props();
</script>

<div
    class="flex items-center justify-center rounded-xl border p-4 min-h-28 min-w-24"
>
    {#each set.cards as card}
        <CardFront {card} />
    {/each}
</div>
