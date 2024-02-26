<script lang="ts">
  import Set from "$lib/Set.svelte";
  import CardBack from "$lib/cards/CardBack.svelte";
  import { type State } from "$lib/model";
  import PlayerView from "$lib/views/PlayerView.svelte";

  type Props = {
    game: State;
    name: string;
  };

  let { game, name } = $props<Props>();
  let playerNames = $derived(Object.keys(game.player));
  let selectedIndex = $state(0);

  function prev() {
    selectedIndex =
      (selectedIndex - 1 + playerNames.length) % playerNames.length;
  }
  function next() {
    selectedIndex = (selectedIndex + 1) % playerNames.length;
  }

  function newSet() {
    game.player[name].cards.push([]);
  }
</script>

<div class="h-full p-8 flex w-full flex-col justify-between">
  <div class="flex flex-col gap-8 items-center">
    <div class="flex gap-4 items-center">
      <CardBack />
      <Set bind:cards={game.foldDeck} />
    </div>

    <div role="tablist" class="tabs tabs-boxed">
      {#each playerNames as n, i (i)}
        <button
          role="tab"
          class="tab"
          class:tab-active={n == playerNames[selectedIndex]}
          on:click={() => (selectedIndex = i)}
        >
          {n}
        </button>
      {/each}
    </div>
  </div>
  <div class="w-full flex justify-between items-center">
    <button class="btn btn-circle" on:click={prev}> ← </button>
    <PlayerView bind:player={game.player[playerNames[selectedIndex]]} />
    <button class="btn btn-circle" on:click={next}> → </button>
  </div>

  <div class="flex items-center justify-between">
    <p>Playing as <span class="text-primary font-bold">{name}</span></p>
    <Set bind:cards={game.player[name].cards[0]} />
    <button class="btn btn-primary btn-circle" on:click={newSet}> + </button>
  </div>
</div>
