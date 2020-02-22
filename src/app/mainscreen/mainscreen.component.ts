import { Component, OnInit, NgZone } from '@angular/core';

import { AppService } from '../app.service';
import { UserService } from '../common/user.service';

import { Observable } from "rxjs";

import { TimerObservable } from "rxjs/observable/TimerObservable";

import { BannerConstants } from '../common/banner-constants'

@Component({
	// mainscreen-component
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss','./flagstyles.scss']

})
export class MainscreenComponent implements OnInit {

	constructor(
		private appService:AppService, 
		public zone: NgZone,
		private userService:UserService,
		private bannerConstants:BannerConstants ) {}
		
	interval = 120000;
	liveMessages = this.appService.messages;
	msgConnection;
	usersConnection;
	getProbez;
	connectedUsers;
	randoBanner;

	bannerContent = this.bannerConstants.bannerArray[0];
	bannerArray = this.bannerConstants.bannerArray;

	// @TODO the banner stuff is a mess
	iterableDiffer: any;
	usersList: [] = this.userService.users;
	userDisconnect;
	flagClasses;
	dataBg: any;
	topContent: string =  "Join wifi 'secureconnection', type http://192.168.1.1 into browser";
	connectedCount: string;
	private kickedUser;
	private alive: boolean; // used to unsubscribe from the TimerObservable

	ngOnInit() {

		this.bannerRotation();

		TimerObservable.create(0, this.interval)
		      .subscribe(() => {
		        this.appService.getProbez()
		          .subscribe((probez: any) => {
		        
		            var tempDataBg = probez.sort((a:any,b:any) => {
						return b.timestamp - a.timestamp;
					});
					this.zone.run(() => this.dataBg = tempDataBg);
		          });
		      });

		// @TODO check messages obj isn't empty then loop through
		// filling screen with previous
		this.msgConnection = this.appService.getMessages().subscribe(message => {
			
			this.appService.processNewMessage(message);

			// reverse order of messages array, new at top
			this.liveMessages = this.appService.messages.sort((a:any,b:any) => {
				return b.msgID - a.msgID;
			});
		})

		this.userDisconnect = this.userService.removeUser().subscribe((disconnectedUserSocket:any) => {
			this.userService.reallyRemoveUser(disconnectedUserSocket);
		})

		this.kickedUser = this.userService.getKickedUser().subscribe((kickedUser:any) => {
      
			let tempMessages = this.appService.messages.filter(function( msgObj:any ) {
				return msgObj['uID'] !== kickedUser['uID'];
			});

			this.zone.run(() => this.liveMessages = this.appService.messages = tempMessages);
			
		})
	}

	public bannerRotation(){
		setInterval (() => {
			this.bannerContent = this.bannerConstants.bannerArray[Math.floor(Math.random() * this.bannerConstants.bannerArray.length)];
		}, 6000);
	}

// BANNERS

	
}
