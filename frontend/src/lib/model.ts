export type State = {
	player: { [k: string]: Player };
	drawDeck: Card[];
	foldDeck: Card[];
	onGoing: boolean;
	currentPlayer?: string;
};

export type Player = {
	name: string,
	cards: Card[][];
};

export type Card = {
	id: number,
	v: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
	s: 'H' | 'D' | 'C' | 'S';
	o?: string;
}

export type Move = {
	from: Location
	to: Location
	card: number,
	player: Player,
};

export type Location = {
	owner: string,
	nr: number,
}

export function cardValue(card: Card): string {
	if (card.v >= 2 && card.v <= 10) {
		return card.v.toString()
	}

	switch (card.v) {
		case 11: return "J"
		case 12: return "Q"
		case 13: return "K"
		case 14: return "A"
	}

	return "Joker"
}

export function cardSortFunc(c1: Card, c2: Card): number {
	if (c1.v != c2.v) {
		return c1.v - c2.v;
	}
	const s1 = c1.s.charCodeAt(0);
	const s2 = c2.s.charCodeAt(0);
	return s1 - s2;
}

