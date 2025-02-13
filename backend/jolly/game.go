package jolly

import (
	"fmt"
	"jolly/pb"
	"math/rand"
	"slices"

	"golang.org/x/exp/maps"
)

var symbols = [...]pb.Symbol{
	pb.Symbol_Clubs,
	pb.Symbol_Diamonds,
	pb.Symbol_Hearts,
	pb.Symbol_Spades,
}

func (state *State) DealCards() {
	var id int32 = 0
	for _, sym := range symbols {
		var val int32
		for val = pb.Value_Two; val <= pb.Value_Ace; val++ {
			state.DrawDeck.Push(&pb.Card{
				Id:     id,
				Symbol: sym,
				Value:  val,
			})
			id++
		}
	}

	state.DrawDeck.Shuffle()

	for _, player := range state.Player {
		for range 13 {
			player.Hand.Push(state.DrawDeck.Pop())
		}
		player.Hand.Sort()
	}
}

func (state *State) NextTurn() {
	playerNames := maps.Keys(state.Player)
	idx := slices.Index(playerNames, state.CurrentPlayer)
	idx = (idx + 1) % len(playerNames)
	state.CurrentPlayer = playerNames[idx]
	state.drawDone = false
}

func (state *State) Start() error {
	if state.OnGoing {
		return fmt.Errorf("game is already started")
	}
	playerNames := maps.Keys(state.Player)
	state.OnGoing = true
	state.CurrentPlayer = playerNames[rand.Intn(len(playerNames))]
	state.DealCards()
	return nil
}

func (state *State) Draw(player *Player) error {
	if state.drawDone {
		return fmt.Errorf("draw is already done")
	}
	card := state.DrawDeck.Pop()
	player.Hand.Push(card)
	state.drawDone = true
	return nil
}

func (state *State) DrawFolded(player *Player, action *pb.DrawFolded) error {
	if state.drawDone {
		return fmt.Errorf("draw is already done")
	}
	if len(state.FoldDeck.Cards) < int(action.NumOfCards) {
		return fmt.Errorf("not enough cards in fold deck")
	}
	for range action.NumOfCards {
		card := state.FoldDeck.Pop()
		player.Hand.Push(card)
	}
	state.drawDone = true
	return nil
}

func (state *State) Fold(player *Player, action *pb.Fold) error {
	if !state.drawDone {
		return fmt.Errorf("draw is not done")
	}
	if len(player.Hand.Cards) == 0 {
		return fmt.Errorf("no cards to fold")
	}
	card := player.Hand.RemoveCard(action.Card)
	if card == nil {
		return fmt.Errorf("card is not valid")
	}
	state.FoldDeck.Push(card)
	return nil
}

func (state *State) PlaySet(player *Player, action *pb.PlaySet) error {
	return fmt.Errorf("todo") // TODO
}

func (state *State) PlaySingleCard(player *Player, action *pb.PlaySingleCard) error {
	return fmt.Errorf("todo") // TODO
}
