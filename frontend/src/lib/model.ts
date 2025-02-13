import type { HiddenSet, Set, Update } from "$lib/pb/messages";

type PlayerMap = Update["playerInfos"];

export type State = {
	player: PlayerMap;
	drawDeck: HiddenSet;
	foldDeck: Set;
	hand: Set;
	currentPlayer?: string;
	onGoing: boolean;
};

export function updateState(state: State, update: Update): void {
	if (!update.drawSet || !update.foldSet || !update.handSet)
		return;
	state.player = update.playerInfos;
	state.drawDeck = update.drawSet;
	state.foldDeck = update.foldSet;
	state.hand = update.handSet;
	state.onGoing = update.onGoing;
}