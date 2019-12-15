import { Component, OnInit } from '@angular/core';
import { PushyService } from '../services/pushy.service';
import { GameLobbyInformationDto } from '../../../models/application-facade';
import { PushyFieldDto, PushySquareType, PushySquareDto } from '../../../models/application-facade';

@Component({
  selector: 'awd-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  private _pushyService: PushyService;
  public field: PushyFieldDto;

  public get lobby(): GameLobbyInformationDto {
    return this._pushyService.currentLobby;
  }

  constructor(pushyService: PushyService) {
    this._pushyService = pushyService;

    this.field = new PushyFieldDto();
    this.field.squares = new Array<Array<PushySquareDto>>();
    for (let i = 0; i < 10; i++) {
      this.field.squares.push(new Array<PushySquareDto>())
      for (let j = 0; j < 10; j++) {
        this.field.squares[i].push(new PushySquareDto());
        this.field.squares[i][j].squareType = i === 0 || j == 0 ? PushySquareType.WALL : PushySquareType.AIR;
      }
    }
  }

  ngOnInit() {
    this._pushyService.playersChanged().subscribe(players => {
      this.lobby.players = players;
    });
  }

}
