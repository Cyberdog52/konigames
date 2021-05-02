import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/model/dtos";
import {IdentityService} from "../../../shared/identity.service";
import {WerwoerterGame, WerwoerterRole} from "../../../shared/model/werwoerter-dtos";
import {WerwoerterService} from "../werwoerter.service";

@Component({
  selector: 'citizenvote',
  templateUrl: './citizenvote.component.html',
  styleUrls: ['./citizenvote.component.scss']
})
export class CitizenvoteComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;
  selectedPlayerName: string;

  constructor(private werwoerterService: WerwoerterService,
              private profileService: IdentityService) { }

  ngOnInit() {
  }

  getSelectablePlayers(): Player[] {
    if (this.werwoerterGame == null) {
      return [];
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoerterGame.game.players.filter(player => player.name != playerName);
  }

  playerToStr(player: Player): string {
    return player.name;
  }

  getText(): string {
    return "Versuche einen Werwolf zu enttarnen!"
  }

  isSendSelectedPlayerDisabled() {
    return this.selectedPlayerName == null;
  }

  sendSelectedPlayer() {
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoerterService.sendGuessPlayer(this.werwoerterGame.game.name, playerName, this.selectedPlayerName).subscribe(response => {
    })
  }

  hasAlreadyVoted() {
    if (this.werwoerterGame == null) {
      return true;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoerterGame.playersThatVoted.filter(player => {
      return player.name == playerName;
    }).length > 0;
  }

}

