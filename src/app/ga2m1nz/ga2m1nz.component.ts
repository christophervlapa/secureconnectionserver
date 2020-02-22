import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';
import { UserService } from '../common/user.service';

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

  constructor(
	  private appService:AppService,
	  private userService:UserService
	) { }

  ngOnInit() {

 	this.userDisconnect = this.userService.removeUser().subscribe(disconnectedUserSocket => {
			
		this.userService.reallyRemoveUser(disconnectedUserSocket);
		this.connectedUsers = this.appService.users;
	})

	this.kickedUserSub = this.userService.getKickedUser().subscribe(kickedUser => {
		this.userService.reallyRemoveUser(kickedUser);
	});
  }

  kickUser(uid){
  	this.userService.kickUser(uid);
  }

}
