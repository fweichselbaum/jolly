package pb

import (
	"math/rand"
	"slices"
)

func NewSet() *Set {
	return &Set{
		Cards: make([]*Card, 0),
	}
}

func (set *Set) Hide() *HiddenSet {
	return &HiddenSet{
		NumOfCards: int32(len(set.Cards)),
	}
}

func (set *Set) Push(card *Card) {
	set.Cards = append(set.Cards, card)
}

func (set *Set) ContainsCard(card *Card) bool {
	for _, c := range set.Cards {
		if c.isEqual(card) {
			return true
		}
	}
	return false
}

func (set *Set) RemoveCard(card *Card) *Card {
	for i, c := range set.Cards {
		if c.isEqual(card) {
			return set.RemoveIdx(i)
		}
	}
	return nil
}

func (set *Set) RemoveIdx(idx int) *Card {
	c := set.Cards[idx]
	set.Cards = append(set.Cards[:idx], set.Cards[idx+1:]...)
	return c
}

func (set *Set) Pop() *Card {
	return set.RemoveIdx(len(set.Cards) - 1)
}

func (set *Set) Sort() {
	slices.SortFunc(set.Cards, func(c1, c2 *Card) int {
		if c1.Value != c2.Value {
			return int(c1.Value - c2.Value)
		}
		return int(c1.Symbol) - int(c2.Symbol)
	})
}

func (set *Set) Shuffle() {
	rand.Shuffle(len(set.Cards), func(i, j int) {
		set.Cards[i], set.Cards[j] = set.Cards[j], set.Cards[i]
	})
}

func (set *Set) Validate() bool {
	return set.validateAscending() || set.validateSymbols()
}

func (set *Set) validateAscending() bool {
	cardsCopy := make([]*Card, len(set.Cards))
	copy(cardsCopy, set.Cards)
	slices.SortFunc(cardsCopy, func(c1, c2 *Card) int {
		return int(c1.Value - c2.Value)
	})
	value := cardsCopy[0].Value
	for _, c := range cardsCopy {
		if c.Value != value {
			return false
		}
		value++
	}
	return true
}

func (set *Set) validateSymbols() bool {
	symbol := set.Cards[0].Symbol
	for _, c := range set.Cards {
		if c.Symbol != symbol {
			return false
		}
	}
	return true
}
