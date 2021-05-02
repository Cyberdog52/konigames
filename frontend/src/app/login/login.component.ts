import {Component, OnInit} from '@angular/core';
import {IdentityService} from "../shared/identity.service";
import {Identity} from "../shared/model/dtos";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name : string = "";
  identityExists: boolean = false;

  constructor(private identityService: IdentityService,
              private router: Router,
              private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  checkIfProfileExists() {
    if (this.name == null || this.name.length === 0) {
      return false;
    }
    if (this.isNameNotAllowed()) {
      this.toastrService.info('Sonderzeichen sind nicht erlaubt.', 'Achtung');
      return false;
    }
    this.identityService.getIdentity(this.name)
      .pipe(take(1))
      .subscribe(profile => {
      this.identityExists = true;
    }, () => {
      this.identityExists = false;
    })
  }

  login(): void {
    const identity = this.createIdentity();
    this.identityService.login(identity)
      .pipe(take(1))
      .subscribe(() => {
      this.loginLogic(identity)
    }, error=> {
      this.displayLogin(error);
    });
  }

  loginLogic(identity: Identity) {
    this.identityService.setLocalProfile(identity);
    this.identityService.updateLoggedInProfile(identity);
    this.router.navigateByUrl('lobby')
  }

  private createIdentity(): Identity {
    return {
      name: this.name
    }
  }

  private displayLogin(error) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 400:
        case 404: {
          this.toastrService.error('Name oder Passwort ist nicht korrekt.', 'Login Fehler');
          break
        }
        case 504: {
          this.toastrService.error('Probleme in der Applikation. Versuchen Sie es später erneut.', 'Login failure');
          break
        }
        default: {
          this.toastrService.error('Unbekanntes Problem.', 'Login Fehler');
        }
      }
    }
  }

  isNameNotAllowed() {
    if (this.name == null || this.name.length === 0) {
      return true;
    }
    const pattern = /^[a-zA-Z0-9]*$/;
    return !this.name.match(pattern);
  }
}

