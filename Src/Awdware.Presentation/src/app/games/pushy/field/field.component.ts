import { Component, OnInit, HostListener } from '@angular/core';
import { PushyService } from '../services/pushy.service';
import { GameLobbyInformationDto, PushyMoveDirection } from '../../../models/application-facade';
import { PushyFieldDto, PushySquareType, PushySquareDto } from '../../../models/application-facade';

@Component({
  selector: 'awd-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  private _pushyService: PushyService;
  public field: PushyFieldDto;
  PushySquareType = PushySquareType;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const key = event.key;
    switch (key) {
      case 'w': this._pushyService.sendMove(PushyMoveDirection.UP).subscribe(); break;
      case 'd': this._pushyService.sendMove(PushyMoveDirection.RIGHT).subscribe(); break;
      case 's': this._pushyService.sendMove(PushyMoveDirection.DOWN).subscribe(); break;
      case 'a': this._pushyService.sendMove(PushyMoveDirection.LEFT).subscribe(); break;
    }

  }

  constructor(pushyService: PushyService) {
    this._pushyService = pushyService;

    this.field = new PushyFieldDto();
    this.field.squares = new Array<Array<PushySquareDto>>();
    for (let i = 0; i < 10; i++) {
      this.field.squares.push(new Array<PushySquareDto>());
      for (let j = 0; j < 10; j++) {
        this.field.squares[i].push(new PushySquareDto());
        this.field.squares[i][j].squareType = i === 0 || j === 0 ? PushySquareType.WALL : PushySquareType.AIR;
      }
    }
    this.field.squares[5][5].figures = [{ userId: this._pushyService.myPlayer.id }];
  }

  public get lobby(): GameLobbyInformationDto {
    return this._pushyService.currentLobby;
  }

  ngOnInit() {
    this._pushyService.playersChanged().subscribe(players => {
      this.lobby.players = players;
    });
    this._pushyService.getMove().subscribe(field => {
      console.warn(field);
      this.field = field;
    });
  }

}
