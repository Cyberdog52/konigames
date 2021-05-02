import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game, GameType} from "../shared/model/dtos";
import {IdentityService} from "../shared/identity.service";

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private backendUrl = "api/game/";

  constructor(private httpClient: HttpClient, private profileService: IdentityService) {
  }

  public getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.backendUrl + '');
  }

  public createGame(name: string, gameType: GameType): Observable<Game> {
    let url = `${this.backendUrl}create?gameName=${name}&gameType=${gameType}`;
    return this.httpClient.post<Game>(url, this.profileService.getCurrentIdentity().name)
  }

  public joinGame(name: string): Observable<Game> {
    return this.httpClient.post<Game>(`${this.backendUrl}join?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }

  public startGame(game: Game): Observable<Game> {
    return this.httpClient.get<Game>(`${this.backendUrl}start?gameName=${game.name}`);
  }

  public leaveGame(name: string) {
    return this.httpClient.post<Game>(`${this.backendUrl}leave?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }

  public deleteGame(name: string) {
    return this.httpClient.post<Game>(`${this.backendUrl}delete?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }
}
