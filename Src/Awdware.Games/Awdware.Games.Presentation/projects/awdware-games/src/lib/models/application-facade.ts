export class GameLobbyInformationDto {
  public id: string;
  public name: string;
  public players: Array<GamePlayerDto>;
}

export class GamePlayerDto {
  public id: string;
  public name: string;
  public lobbyOwner: boolean;
}

export enum PushyColor {
  UNKNOWN = 0,
  RED = 1,
  BLUE = 2,
  GREEN = 3,
  YELLOW = 4
}

export class PushyFieldDto {
  public squares: Array<Array<PushySquareDto>>;
}

export enum PushyMoveDirectionDto {
  UNKNOWN = 0,
  UP = 1,
  RIGHT = 2,
  DOWN = 3,
  LEFT = 4
}

export class PushySquareDto {
  public squareType: PushySquareTypeDto;
  public childSquares: Array<PushySquareDto>;
  public color?: PushyColor;
  public userId: string;
}

export enum PushySquareTypeDto {
  UNKNOWN = 0,
  FIGURE = 1,
  AIR = 2,
  WALL = 3,
  BOX = 4,
  BOX_FIELD = 5,
  HOUSE = 6
}
