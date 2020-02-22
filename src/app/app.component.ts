import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from './app.service';
import { UserService } from './common/user.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private connection: any;
  private message: string;
  private liveMessages: string;
  private activeInput: boolean;
  private newFlag: any;

  constructor(
    private appService:AppService,
    private userService:UserService
  ) {}

  ngOnInit() {
    console.log("APP SERVICE init");
  
    this.connection = this.userService.getNewUser().subscribe(newUser => {
        this.appService.users.push(newUser);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
