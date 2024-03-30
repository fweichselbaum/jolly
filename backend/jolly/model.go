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
	Player   map[string]*Player
	DrawDeck *pb.Set
	FoldDeck *pb.Set
	OnGoing  bool
}

// type Card struct {
// 	Id     int
// 	Value  int
// 	Symbol string
// 	Owner  string
// }

type Player struct {
	Name  string
	Hand  *pb.Set
	Cards []*pb.Set
}

func NewState() *State {
	return &State{
		Player:   make(map[string]*Player),
		DrawDeck: pb.NewSet(),
		FoldDeck: pb.NewSet(),
		OnGoing:  false,
	}
}

func NewPlayer(name string, handler *Handler) *Player {
	return &Player{
		Name:  name,
		Hand:  &pb.Set{Cards: make([]*pb.Card, 13)},
		Cards: make([]*pb.Set, 0),
	}
}
