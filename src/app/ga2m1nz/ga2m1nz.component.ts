import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-ga2m1nz',
  templateUrl: './ga2m1nz.component.html',
  styleUrls: ['./ga2m1nz.component.css']
})
export class Ga2m1nzComponent implements OnInit {

	usersConnection;
	userDisconnect;
	connectedUsers;
	kickedUserSub;

  constructor(private appService:AppService) { }

  ngOnInit() {

  	// this.connectedUsers = this.appService.users;

 	this.userDisconnect = this.appService.removeUser().subscribe(disconnectedUserSocket => {
			
		this.appService.reallyRemoveUser(disconnectedUserSocket);
		this.connectedUsers = this.appService.users;
	})

	this.kickedUserSub = this.appService.getKickedUser().subscribe(kickedUser => {
		// console.log("GADMIN ",kickedUser);
		this.appService.reallyRemoveUser(kickedUser);
	});
  }

  kickUser(uid){
  	// console.log("ADMIN KICK UID ",uid)
  	this.appService.kickUser(uid);
  }

}
