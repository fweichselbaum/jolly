package jolly

const (
	Jack int = iota + 11
	Queen
	King
	Ace
	Joker int = 1
)

const (
	Club    string = "C"
	Diamond string = "D"
	Heart   string = "H"
	Spade   string = "S"
)

type State struct {
	Player   map[string]*Player `json:"player"`
	DrawDeck []*Card            `json:"drawDeck"`
	FoldDeck []*Card            `json:"foldDeck"`
	OnGoing  bool               `json:"onGoing"`
}

type Card struct {
	Id     int    `json:"id"`
	Value  int    `json:"v"`
	Symbol string `json:"s"`
	Owner  string `json:"o,omitempty"`
}

type Player struct {
	Name  string    `json:"name"`
	Cards [][]*Card `json:"cards"`
}

func NewState() *State {
	return &State{
		Player:   make(map[string]*Player),
		DrawDeck: make([]*Card, 0),
		FoldDeck: make([]*Card, 0),
		OnGoing:  false,
	}
}

func NewPlayer(name string, handler *Handler) *Player {
	return &Player{
		Name:  name,
		Cards: make([][]*Card, 0),
	}
}
