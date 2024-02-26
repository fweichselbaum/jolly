<script lang="ts">
	import Game from "$lib/Game.svelte";
	import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";
	import { Toaster } from "svelte-french-toast";

	let name = $state("");
	let joined = $state(false);
</script>

<Toaster />
<div class="absolute top-4 right-4">
	<ThemeSwitcher />
</div>

<main class="w-full h-full grid place-items-center">
	{#if joined}
		<Game {name} bind:joined />
	{:else}
		<div class="flex flex-col gap-4 w-80 rounded-xl border p-8">
			<h1 class="text-3xl mb-4 text-center">Jolly 🃏</h1>

			<p>Join here:</p>
			<form
				class="flex flex-col gap-4 w-full"
				on:submit|preventDefault={() => {
					joined = true;
				}}
			>
				<input
					type="text"
					class="input input-bordered w-full"
					placeholder="Name"
					bind:value={name}
				/>
				<div class="flex justify-between">
					<button type="reset" class="btn">Clear</button>
					<button type="submit" class="btn btn-primary">Join</button>
				</div>
			</form>
		</div>
	{/if}
</main>
