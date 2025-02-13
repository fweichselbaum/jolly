package jolly

import "jolly/pb"

// const (
// 	Jack int = iota + 11
// 	Queen
// 	King
// 	Ace
// 	Joker int = 1
// )

// const (
// 	Club    string = "C"
// 	Diamond string = "D"
// 	Heart   string = "H"
// 	Spade   string = "S"
// )

type State struct {
	Player        map[string]*Player
	DrawDeck      *pb.Set
	FoldDeck      *pb.Set
	CurrentPlayer string
	OnGoing       bool
	drawDone      bool
}

type Player struct {
	Name  string
	Hand  *pb.Set
	Cards []*pb.Set
}

func NewState() *State {
	return &State{
		Player:        make(map[string]*Player),
		DrawDeck:      pb.NewSet(),
		FoldDeck:      pb.NewSet(),
		CurrentPlayer: "",
		OnGoing:       false,
		drawDone:      false,
	}
}

func NewPlayer(name string, handler *Handler) *Player {
	return &Player{
		Name:  name,
		Hand:  &pb.Set{Cards: make([]*pb.Card, 0)},
		Cards: make([]*pb.Set, 0),
	}
}
