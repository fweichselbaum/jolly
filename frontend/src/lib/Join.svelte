<script lang="ts">

</script>

<div class="flex flex-col gap-4 w-80 rounded-xl border p-8">
			<h1 class="text-3xl mb-4 text-center">Jolly 🃏</h1>
			<p>Join here:</p>
			<form
				class="flex flex-col gap-4 w-full"
				onsubmit={enter}
			>
				<input
					autofocus
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