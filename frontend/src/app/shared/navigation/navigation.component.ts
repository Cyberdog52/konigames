import { Component, OnInit } from '@angular/core';
import {IdentityService} from "../identity.service";
import {Identity} from "../model/dtos";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedInIdentity: Identity;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.loggedInIdentity = this.identityService.getCurrentIdentity();
    this.identityService.loggedInProfile.subscribe(loggedInIdentity => {
      this.loggedInIdentity = loggedInIdentity
    });

  }

  isLoggedIn(): boolean {
    return !!this.loggedInIdentity;
  }
}
