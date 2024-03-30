package pb

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
