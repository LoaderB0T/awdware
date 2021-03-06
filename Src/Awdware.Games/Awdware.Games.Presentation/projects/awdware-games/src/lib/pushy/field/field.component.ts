import { Component, OnInit, HostListener } from '@angular/core';
import { PushyService } from '../services/pushy.service';
import { PushyMoveDirectionDto, PushyFieldDto, PushySquareTypeDto, PushySquareDto, GameLobbyInformationDto } from '../../models/application-facade';


@Component({
  selector: 'awd-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  private _pushyService: PushyService;
  public field: PushyFieldDto;
  PushySquareType: typeof PushySquareTypeDto = PushySquareTypeDto;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const key = event.key;
    switch (key) {
      case 'w': this._pushyService.sendMove(PushyMoveDirectionDto.UP).subscribe(); break;
      case 'd': this._pushyService.sendMove(PushyMoveDirectionDto.RIGHT).subscribe(); break;
      case 's': this._pushyService.sendMove(PushyMoveDirectionDto.DOWN).subscribe(); break;
      case 'a': this._pushyService.sendMove(PushyMoveDirectionDto.LEFT).subscribe(); break;
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
        this.field.squares[i][j].squareType = i === 0 || j === 0 ? PushySquareTypeDto.WALL : PushySquareTypeDto.AIR;
      }
    }
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
