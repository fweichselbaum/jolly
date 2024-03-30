package jolly

// func (state *State) Start() {

// 	id := 0

// 	for _sym := range 4 {
// 		var sym string
// 		switch {
// 		case _sym == 0:
// 			sym = Club
// 		case _sym == 1:
// 			sym = Diamond
// 		case _sym == 2:
// 			sym = Heart
// 		case _sym == 3:
// 			sym = Spade
// 		}

// 		for val := 2; val <= Ace; val++ {
// 			state.DrawDeck = append(state.DrawDeck, &Card{Id: id, Value: val, Symbol: sym})
// 			id++
// 			state.DrawDeck = append(state.DrawDeck, &Card{Id: id, Value: val, Symbol: sym})
// 			id++
// 		}

// 		state.DrawDeck = append(state.DrawDeck, &Card{Id: id, Value: Joker, Symbol: sym})
// 		id++
// 	}

// 	rand.Shuffle(len(state.DrawDeck), func(i, j int) {
// 		c := state.DrawDeck[i]
// 		state.DrawDeck[i] = state.DrawDeck[j]
// 		state.DrawDeck[j] = c
// 	})

// 	for _, player := range state.Player {
// 		player.Cards = make([][]*Card, 1)
// 		player.Cards[HandCards] = make([]*Card, 13)
// 		for i := range 13 {
// 			state.DrawDeck, player.Cards[HandCards][i] = PopCard(state.DrawDeck)
// 		}
// 		slices.SortStableFunc(player.Cards[HandCards], func(c1, c2 *Card) int {
// 			if c1.Value != c2.Value {
// 				return c1.Value - c2.Value
// 			}
// 			s1 := c1.Symbol[0]
// 			s2 := c2.Symbol[0]
// 			return int(s1 - s2)
// 		})
// 	}
// 	state.OnGoing = true
// }

// func PopCard(s []*Card) ([]*Card, *Card) {
// 	index := len(s) - 1
// 	c := s[index]
// 	return s[:index], c
// }

// func RemoveCard(s []*Card, index int) ([]*Card, *Card) {
// 	c := s[index]
// 	return append(s[:index], s[index+1:]...), c
// }
