/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum SendType {
  Type_Draw = 0,
  Type_DrawFolded = 1,
  Type_Fold = 2,
  Type_PlaySet = 3,
  Type_PlaySingleCard = 4,
  UNRECOGNIZED = -1,
}

export function sendTypeFromJSON(object: any): SendType {
  switch (object) {
    case 0:
    case "Type_Draw":
      return SendType.Type_Draw;
    case 1:
    case "Type_DrawFolded":
      return SendType.Type_DrawFolded;
    case 2:
    case "Type_Fold":
      return SendType.Type_Fold;
    case 3:
    case "Type_PlaySet":
      return SendType.Type_PlaySet;
    case 4:
    case "Type_PlaySingleCard":
      return SendType.Type_PlaySingleCard;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SendType.UNRECOGNIZED;
  }
}

export function sendTypeToJSON(object: SendType): string {
  switch (object) {
    case SendType.Type_Draw:
      return "Type_Draw";
    case SendType.Type_DrawFolded:
      return "Type_DrawFolded";
    case SendType.Type_Fold:
      return "Type_Fold";
    case SendType.Type_PlaySet:
      return "Type_PlaySet";
    case SendType.Type_PlaySingleCard:
      return "Type_PlaySingleCard";
    case SendType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Symbol {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3,
  UNRECOGNIZED = -1,
}

export function symbolFromJSON(object: any): Symbol {
  switch (object) {
    case 0:
    case "Clubs":
      return Symbol.Clubs;
    case 1:
    case "Diamonds":
      return Symbol.Diamonds;
    case 2:
    case "Hearts":
      return Symbol.Hearts;
    case 3:
    case "Spades":
      return Symbol.Spades;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Symbol.UNRECOGNIZED;
  }
}

export function symbolToJSON(object: Symbol): string {
  switch (object) {
    case Symbol.Clubs:
      return "Clubs";
    case Symbol.Diamonds:
      return "Diamonds";
    case Symbol.Hearts:
      return "Hearts";
    case Symbol.Spades:
      return "Spades";
    case Symbol.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Card {
  value: number;
  symbol: Symbol;
  owner?: string | undefined;
}

export interface Set {
  cards: Card[];
}

export interface HiddenSet {
  numOfCards: number;
}

export interface Player {
  name: string;
  handSet: Set | undefined;
  cardSets: Set[];
}

export interface OtherPlayer {
  name: string;
  handSet: HiddenSet | undefined;
  cardSets: Set[];
}

export interface Draw {
}

export interface DrawFolded {
  numOfCards: number;
}

export interface Fold {
  card: Card | undefined;
}

export interface PlaySet {
  cards: Set | undefined;
}

export interface PlaySingleCard {
  name: string;
  numOfSet: number;
  card: Card | undefined;
  jokerOnLow?: boolean | undefined;
}

export interface Update {
  drawSet: HiddenSet | undefined;
  foldSet: Set | undefined;
  player: Player | undefined;
  otherPlayers: { [key: string]: OtherPlayer };
}

export interface Update_OtherPlayersEntry {
  key: string;
  value: OtherPlayer | undefined;
}

function createBaseCard(): Card {
  return { value: 0, symbol: 0, owner: undefined };
}

export const Card = {
  encode(message: Card, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    if (message.symbol !== 0) {
      writer.uint32(16).int32(message.symbol);
    }
    if (message.owner !== undefined) {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Card {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.symbol = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Card {
    return {
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
      symbol: isSet(object.symbol) ? symbolFromJSON(object.symbol) : 0,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : undefined,
    };
  },

  toJSON(message: Card): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    if (message.symbol !== 0) {
      obj.symbol = symbolToJSON(message.symbol);
    }
    if (message.owner !== undefined) {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Card>, I>>(base?: I): Card {
    return Card.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Card>, I>>(object: I): Card {
    const message = createBaseCard();
    message.value = object.value ?? 0;
    message.symbol = object.symbol ?? 0;
    message.owner = object.owner ?? undefined;
    return message;
  },
};

function createBaseSet(): Set {
  return { cards: [] };
}

export const Set = {
  encode(message: Set, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.cards) {
      Card.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Set {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cards.push(Card.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Set {
    return { cards: globalThis.Array.isArray(object?.cards) ? object.cards.map((e: any) => Card.fromJSON(e)) : [] };
  },

  toJSON(message: Set): unknown {
    const obj: any = {};
    if (message.cards?.length) {
      obj.cards = message.cards.map((e) => Card.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Set>, I>>(base?: I): Set {
    return Set.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Set>, I>>(object: I): Set {
    const message = createBaseSet();
    message.cards = object.cards?.map((e) => Card.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHiddenSet(): HiddenSet {
  return { numOfCards: 0 };
}

export const HiddenSet = {
  encode(message: HiddenSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numOfCards !== 0) {
      writer.uint32(8).int32(message.numOfCards);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HiddenSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHiddenSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numOfCards = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HiddenSet {
    return { numOfCards: isSet(object.numOfCards) ? globalThis.Number(object.numOfCards) : 0 };
  },

  toJSON(message: HiddenSet): unknown {
    const obj: any = {};
    if (message.numOfCards !== 0) {
      obj.numOfCards = Math.round(message.numOfCards);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HiddenSet>, I>>(base?: I): HiddenSet {
    return HiddenSet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HiddenSet>, I>>(object: I): HiddenSet {
    const message = createBaseHiddenSet();
    message.numOfCards = object.numOfCards ?? 0;
    return message;
  },
};

function createBasePlayer(): Player {
  return { name: "", handSet: undefined, cardSets: [] };
}

export const Player = {
  encode(message: Player, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.handSet !== undefined) {
      Set.encode(message.handSet, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.cardSets) {
      Set.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Player {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.handSet = Set.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cardSets.push(Set.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Player {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      handSet: isSet(object.handSet) ? Set.fromJSON(object.handSet) : undefined,
      cardSets: globalThis.Array.isArray(object?.cardSets) ? object.cardSets.map((e: any) => Set.fromJSON(e)) : [],
    };
  },

  toJSON(message: Player): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.handSet !== undefined) {
      obj.handSet = Set.toJSON(message.handSet);
    }
    if (message.cardSets?.length) {
      obj.cardSets = message.cardSets.map((e) => Set.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Player>, I>>(base?: I): Player {
    return Player.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Player>, I>>(object: I): Player {
    const message = createBasePlayer();
    message.name = object.name ?? "";
    message.handSet = (object.handSet !== undefined && object.handSet !== null)
      ? Set.fromPartial(object.handSet)
      : undefined;
    message.cardSets = object.cardSets?.map((e) => Set.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOtherPlayer(): OtherPlayer {
  return { name: "", handSet: undefined, cardSets: [] };
}

export const OtherPlayer = {
  encode(message: OtherPlayer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.handSet !== undefined) {
      HiddenSet.encode(message.handSet, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.cardSets) {
      Set.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OtherPlayer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOtherPlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.handSet = HiddenSet.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cardSets.push(Set.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OtherPlayer {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      handSet: isSet(object.handSet) ? HiddenSet.fromJSON(object.handSet) : undefined,
      cardSets: globalThis.Array.isArray(object?.cardSets) ? object.cardSets.map((e: any) => Set.fromJSON(e)) : [],
    };
  },

  toJSON(message: OtherPlayer): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.handSet !== undefined) {
      obj.handSet = HiddenSet.toJSON(message.handSet);
    }
    if (message.cardSets?.length) {
      obj.cardSets = message.cardSets.map((e) => Set.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OtherPlayer>, I>>(base?: I): OtherPlayer {
    return OtherPlayer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OtherPlayer>, I>>(object: I): OtherPlayer {
    const message = createBaseOtherPlayer();
    message.name = object.name ?? "";
    message.handSet = (object.handSet !== undefined && object.handSet !== null)
      ? HiddenSet.fromPartial(object.handSet)
      : undefined;
    message.cardSets = object.cardSets?.map((e) => Set.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDraw(): Draw {
  return {};
}

export const Draw = {
  encode(_: Draw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Draw {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Draw {
    return {};
  },

  toJSON(_: Draw): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Draw>, I>>(base?: I): Draw {
    return Draw.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Draw>, I>>(_: I): Draw {
    const message = createBaseDraw();
    return message;
  },
};

function createBaseDrawFolded(): DrawFolded {
  return { numOfCards: 0 };
}

export const DrawFolded = {
  encode(message: DrawFolded, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numOfCards !== 0) {
      writer.uint32(8).int32(message.numOfCards);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DrawFolded {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDrawFolded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.numOfCards = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DrawFolded {
    return { numOfCards: isSet(object.numOfCards) ? globalThis.Number(object.numOfCards) : 0 };
  },

  toJSON(message: DrawFolded): unknown {
    const obj: any = {};
    if (message.numOfCards !== 0) {
      obj.numOfCards = Math.round(message.numOfCards);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DrawFolded>, I>>(base?: I): DrawFolded {
    return DrawFolded.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DrawFolded>, I>>(object: I): DrawFolded {
    const message = createBaseDrawFolded();
    message.numOfCards = object.numOfCards ?? 0;
    return message;
  },
};

function createBaseFold(): Fold {
  return { card: undefined };
}

export const Fold = {
  encode(message: Fold, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.card !== undefined) {
      Card.encode(message.card, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fold {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFold();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.card = Card.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Fold {
    return { card: isSet(object.card) ? Card.fromJSON(object.card) : undefined };
  },

  toJSON(message: Fold): unknown {
    const obj: any = {};
    if (message.card !== undefined) {
      obj.card = Card.toJSON(message.card);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Fold>, I>>(base?: I): Fold {
    return Fold.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Fold>, I>>(object: I): Fold {
    const message = createBaseFold();
    message.card = (object.card !== undefined && object.card !== null) ? Card.fromPartial(object.card) : undefined;
    return message;
  },
};

function createBasePlaySet(): PlaySet {
  return { cards: undefined };
}

export const PlaySet = {
  encode(message: PlaySet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cards !== undefined) {
      Set.encode(message.cards, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaySet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaySet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cards = Set.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlaySet {
    return { cards: isSet(object.cards) ? Set.fromJSON(object.cards) : undefined };
  },

  toJSON(message: PlaySet): unknown {
    const obj: any = {};
    if (message.cards !== undefined) {
      obj.cards = Set.toJSON(message.cards);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlaySet>, I>>(base?: I): PlaySet {
    return PlaySet.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlaySet>, I>>(object: I): PlaySet {
    const message = createBasePlaySet();
    message.cards = (object.cards !== undefined && object.cards !== null) ? Set.fromPartial(object.cards) : undefined;
    return message;
  },
};

function createBasePlaySingleCard(): PlaySingleCard {
  return { name: "", numOfSet: 0, card: undefined, jokerOnLow: undefined };
}

export const PlaySingleCard = {
  encode(message: PlaySingleCard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.numOfSet !== 0) {
      writer.uint32(16).int32(message.numOfSet);
    }
    if (message.card !== undefined) {
      Card.encode(message.card, writer.uint32(26).fork()).ldelim();
    }
    if (message.jokerOnLow !== undefined) {
      writer.uint32(32).bool(message.jokerOnLow);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaySingleCard {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaySingleCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numOfSet = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.card = Card.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.jokerOnLow = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlaySingleCard {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      numOfSet: isSet(object.numOfSet) ? globalThis.Number(object.numOfSet) : 0,
      card: isSet(object.card) ? Card.fromJSON(object.card) : undefined,
      jokerOnLow: isSet(object.jokerOnLow) ? globalThis.Boolean(object.jokerOnLow) : undefined,
    };
  },

  toJSON(message: PlaySingleCard): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.numOfSet !== 0) {
      obj.numOfSet = Math.round(message.numOfSet);
    }
    if (message.card !== undefined) {
      obj.card = Card.toJSON(message.card);
    }
    if (message.jokerOnLow !== undefined) {
      obj.jokerOnLow = message.jokerOnLow;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlaySingleCard>, I>>(base?: I): PlaySingleCard {
    return PlaySingleCard.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlaySingleCard>, I>>(object: I): PlaySingleCard {
    const message = createBasePlaySingleCard();
    message.name = object.name ?? "";
    message.numOfSet = object.numOfSet ?? 0;
    message.card = (object.card !== undefined && object.card !== null) ? Card.fromPartial(object.card) : undefined;
    message.jokerOnLow = object.jokerOnLow ?? undefined;
    return message;
  },
};

function createBaseUpdate(): Update {
  return { drawSet: undefined, foldSet: undefined, player: undefined, otherPlayers: {} };
}

export const Update = {
  encode(message: Update, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.drawSet !== undefined) {
      HiddenSet.encode(message.drawSet, writer.uint32(10).fork()).ldelim();
    }
    if (message.foldSet !== undefined) {
      Set.encode(message.foldSet, writer.uint32(18).fork()).ldelim();
    }
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.otherPlayers).forEach(([key, value]) => {
      Update_OtherPlayersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Update {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.drawSet = HiddenSet.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.foldSet = Set.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = Update_OtherPlayersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.otherPlayers[entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Update {
    return {
      drawSet: isSet(object.drawSet) ? HiddenSet.fromJSON(object.drawSet) : undefined,
      foldSet: isSet(object.foldSet) ? Set.fromJSON(object.foldSet) : undefined,
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      otherPlayers: isObject(object.otherPlayers)
        ? Object.entries(object.otherPlayers).reduce<{ [key: string]: OtherPlayer }>((acc, [key, value]) => {
          acc[key] = OtherPlayer.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Update): unknown {
    const obj: any = {};
    if (message.drawSet !== undefined) {
      obj.drawSet = HiddenSet.toJSON(message.drawSet);
    }
    if (message.foldSet !== undefined) {
      obj.foldSet = Set.toJSON(message.foldSet);
    }
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.otherPlayers) {
      const entries = Object.entries(message.otherPlayers);
      if (entries.length > 0) {
        obj.otherPlayers = {};
        entries.forEach(([k, v]) => {
          obj.otherPlayers[k] = OtherPlayer.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Update>, I>>(base?: I): Update {
    return Update.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Update>, I>>(object: I): Update {
    const message = createBaseUpdate();
    message.drawSet = (object.drawSet !== undefined && object.drawSet !== null)
      ? HiddenSet.fromPartial(object.drawSet)
      : undefined;
    message.foldSet = (object.foldSet !== undefined && object.foldSet !== null)
      ? Set.fromPartial(object.foldSet)
      : undefined;
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.otherPlayers = Object.entries(object.otherPlayers ?? {}).reduce<{ [key: string]: OtherPlayer }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = OtherPlayer.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseUpdate_OtherPlayersEntry(): Update_OtherPlayersEntry {
  return { key: "", value: undefined };
}

export const Update_OtherPlayersEntry = {
  encode(message: Update_OtherPlayersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      OtherPlayer.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Update_OtherPlayersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdate_OtherPlayersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = OtherPlayer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Update_OtherPlayersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? OtherPlayer.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Update_OtherPlayersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = OtherPlayer.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Update_OtherPlayersEntry>, I>>(base?: I): Update_OtherPlayersEntry {
    return Update_OtherPlayersEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Update_OtherPlayersEntry>, I>>(object: I): Update_OtherPlayersEntry {
    const message = createBaseUpdate_OtherPlayersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? OtherPlayer.fromPartial(object.value)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
