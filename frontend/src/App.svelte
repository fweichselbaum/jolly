<script lang="ts">
	import Game from "$lib/Game.svelte";
	import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";
	import { Toaster } from "svelte-french-toast";

	let name = $state<string>("");
	let entered = $state<boolean>(false);

	function enter() {
		entered = true;
	}
	function leave() {
		entered = false;
	}
</script>

<Toaster />
<div class="absolute top-4 right-4">
	<ThemeSwitcher />
</div>

<!-- svelte-ignore a11y_autofocus -->
<main class="w-full h-full grid place-items-center">
	{#if entered}
		<Game {name} {leave} />
	{:else}
		
	{/if}
</main>
