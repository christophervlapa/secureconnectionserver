import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from './app.service';

@Component({
	selector: 'app-root',
	providers: [AppService],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // messages = [];
  // users = [];
  connection;
  message;
  liveMessages: string;
  activeInput: boolean;
  newFlag;

  constructor(private appService:AppService) {}

  ngOnInit() {
    console.log("APP SERVICE init");
  
    this.connection = this.appService.getNewUser().subscribe(newUser => {
        this.appService.users.push(newUser);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
