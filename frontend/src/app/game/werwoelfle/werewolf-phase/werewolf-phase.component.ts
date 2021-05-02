import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/model/dtos";
import {IdentityService} from "../../../shared/identity.service";
import {WerwoelfleService} from "../werwoelfle.service";
import {WerwoelfleGame, WerwoelfleRole} from "../../../shared/model/werwoelfle-dtos";

@Component({
  selector: 'werewolf-phase',
  templateUrl: './werewolf-phase.component.html',
  styleUrls: ['./werewolf-phase.component.scss']
})
export class WerewolfPhaseComponent implements OnInit {

  @Input() werwoelfleGame : WerwoelfleGame;
  selectedPlayerName: string;

  constructor(private werwoelfleService: WerwoelfleService,
              private profileService: IdentityService) { }

  ngOnInit() {
  }

  getSelectablePlayers(): Player[] {
    if (this.werwoelfleGame == null) {
      return [];
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoelfleGame.game.players.filter(player => player.name.localeCompare(playerName) != 0);
  }

  playerToStr(player: Player): string {
    return player.name;
  }

  isWerewolf() {
    const role = this.werwoelfleService.getRole(this.werwoelfleGame);
    if (role == null) {
      return false;
    }
    return role == WerwoelfleRole.WEREWOLF;
  }

  getWerwolfText() {
    if (this.werwoelfleGame == null) {
      return "";
    }
    return "Töte einen Bürger. "
  }

  getRestText(): string {
    if (this.werwoelfleGame == null) {
      return "";
    }
    return "Die Werwölfle bestimmen gerade ihr nächstes Opfer"
  }

  isSendSelectedPlayerDisabled() {
    return !this.isWerewolf() || this.selectedPlayerName == null;
  }

  sendSelectedPlayer() {
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoelfleService.vote(this.werwoelfleGame.game.name, playerName, this.selectedPlayerName).subscribe(response => {
    })
  }

  hasAlreadyVoted() {
    if (this.werwoelfleGame == null) {
      return true;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoelfleGame.votes.filter(vote => {
      return vote.fromName.localeCompare(playerName) == 0;
    }).length > 0;
  }
}
