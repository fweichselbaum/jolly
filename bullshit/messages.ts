import type { Move, State } from "$lib/model"

export type Message =
	{
		type: "state",
		data: State
	} | {
		type: "move",
		data: Move,
	} | {
		type: "control",
		data: "start" | "end",
	}
