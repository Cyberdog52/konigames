import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Identity} from "./model/dtos";

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  identityUrl = 'api/identity/';
  private _loggedInIdentity$: Subject<Identity> = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getIdentity(username: string): Observable<Identity> {
    return this.httpClient.post<Identity>(this.identityUrl + "exists", {name: username});
  }

  login(profile: Identity): Observable<void> {
    return this.httpClient.post<void>(this.identityUrl + "login", profile);
  }

  updateLoggedInProfile(profile: Identity) {
    this._loggedInIdentity$.next(profile);
  }

  get loggedInProfile(): Subject<Identity> {
    return this._loggedInIdentity$;
  }

  setLocalProfile(identity: Identity) {
    sessionStorage.setItem("identity", JSON.stringify(identity));
  }

  logout() {
    sessionStorage.removeItem("identity");
    this.updateLoggedInProfile(null);
  }

  getCurrentIdentity(): Identity {
    return JSON.parse(sessionStorage.getItem("identity"));
  }
}
