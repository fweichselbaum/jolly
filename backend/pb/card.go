package pb

const (
	Value_Joker int32 = 1
	Value_Two   int32 = 2
	Value_Three int32 = 3
	Value_Four  int32 = 4
	Value_Five  int32 = 5
	Value_Six   int32 = 6
	Value_Seven int32 = 7
	Value_Eight int32 = 8
	Value_Nine  int32 = 9
	Value_Ten   int32 = 10
	Value_Jack  int32 = 11
	Value_Queen int32 = 12
	Value_King  int32 = 13
	Value_Ace   int32 = 14
)

func (card *Card) isEqual(other *Card) bool {
	return ((card.Value == other.Value) && (card.Symbol == other.Symbol))
}
