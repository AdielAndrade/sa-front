import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {LoginService} from '../login/login.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  showMenu: boolean;
  userStatus:string;
  loginMensage:string = "Entrar";

  constructor(private loginService: LoginService, private cdref: ChangeDetectorRef) { }


  isManeger():boolean{
    if(this.userStatus === "gestor"){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    this.loginService.loggout();
    this.showMenu = false;
    this.loginMensage = "Entrar";
  }

  ngOnInit() {

    this.loginService.showMenuEmitter.subscribe(show => {
     this.showMenu = show;
     this.loginMensage = "Sair";
     this.cdref.detectChanges();
    });

    this.loginService.showUserEmitter.subscribe(user => {
     this.userStatus = user;
     this.cdref.detectChanges();
    });

  }

}
