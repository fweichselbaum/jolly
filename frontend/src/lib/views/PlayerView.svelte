<script lang="ts">
    import type { PlayerInfo } from "$lib/pb/messages";

    type Props = {
        playerName: string;
        playerInfo: PlayerInfo;
    }

    const { playerName, playerInfo = $bindable() }: Props = $props();

</script>

<p>{playerName}</p>