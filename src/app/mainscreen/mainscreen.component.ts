import { Component, OnInit, NgZone } from '@angular/core';

import { AppService } from '../app.service';

import { Observable } from "rxjs";

import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-mainscreen',
  providers: [],
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss','./flagstyles.scss']

})
export class MainscreenComponent implements OnInit {

	liveMessages;
	msgConnection;
	usersConnection;
	getProbez;
	connectedUsers;
	bannerContent;
	randoBanner;
	bannerArr;
	iterableDiffer: any;
	usersList: any = [];
	userDisconnect;
	flagClasses;
	dataBg: any;
	topContent: string;
	connectedCount: string;
	private kickedUser;

	private alive: boolean; // used to unsubscribe from the TimerObservable
	private interval: number;

	constructor(private appService:AppService, public zone: NgZone) {
		// this.iterableDiffer = this._iterableDiffers.find([]).create(null);
		// this.interval = 200000;
		this.interval = 120000;
	}

	ngOnInit() {

		// this.connectedUsers = '';

		// this.connectedCount = this.appService.userTimeConnected();

		this.topContent = "Join wifi 'secureconnection', type http://192.168.1.1 into browser"

		// console.log("PROBEZ ",this.appService.getProbez());

		this.usersList = this.appService.users;
		this.liveMessages = this.appService.messages;

		this.bannerArr = [this.banner001,this.banner002,this.banner003,this.banner004,this.banner005,this.banner006,this.banner007];

// 		let mainscreenCheck = (window.location.href.substr(window.location.href.lastIndexOf('/') + 1)) ? true : false;
// console.log('mainScreen init LOL ',mainscreenCheck);
		this.bannerContent = this.bannerArr[0];

		this.bannerRotation();


		TimerObservable.create(0, this.interval)
		      .subscribe(() => {
		        this.appService.getProbez()
		          .subscribe(probez => {
		            // this.dataBg = probez;

		            // console.log("DOIN PROBEZ BEFORE ",this.dataBg);

		            var tempDataBg = probez.sort((a,b) => {
					// console.log("A ",a.flagIDs.length);
						return b.timestamp - a.timestamp;
					});

					// var d = new Date();
					// var x = document.getElementById("demo");
					// var h = d.getHours();
					// var m = d.getMinutes();
					// var s = d.getSeconds();
					// var nowTime = h + ":" + m + ":" + s;

					this.zone.run(() => this.dataBg = tempDataBg);

					// console.log("DOIN PROBEZ AFTER ",this.dataBg);



		            // console.log("DATA ",probez);
		            // if(!this.display){
		            //   this.display = true;
		            // }
		          });
		      });

		// this.getProbez = this.appService.getProbez().subscribe(probez => {

		// 	// console.log(probez);
		// 	this.dataBg = probez;

		// })
		// @TODO check messages obj isn't empty then loop through
		// filling screen with previous
		this.msgConnection = this.appService.getMessages().subscribe(message => {
// this.flagClasses = 'red';
			this.appService.processNewMessage(message);

			// reverse order of messages array, new at top
			this.liveMessages = this.appService.messages.sort((a,b) => {
			// console.log("A ",a.flagIDs.length);
				return b.msgID - a.msgID;
			});

			// this.liveMessages = this.appService.messages;

			// this.liveMessages = this.appService.liveMessages;

		})

		// this.appService.users.forEach( (value) => {
		// 	this.connectedUsers = this.connectedUsers + '<li><ul class="user-details"><li class="user-ID">' + value['uID'] + '</li><li class="user-flags">' + value['flagIDs'].length + '</li></ul></li>';
		// });

		// USERS

		// this.usersConnection = this.appService.getNewUser().subscribe(newUser => {

		// 	let newUserCheck = this.usersList.includes(newUser);

		// 	if(!newUserCheck){
		// 		console.log("NEW USER ADD!",newUser);
		// 		// this.appService.users.push(newUser);
		// 	}

		// 	// this.appService.users.forEach( (value) => {
		// 	// 	this.connectedUsers = this.connectedUsers + '<li><ul class="user-details"><li class="user-ID">' + value['uID'] + '</li></ul></li>';
		// 	// });
		// })

		this.userDisconnect = this.appService.removeUser().subscribe(disconnectedUserSocket => {
			// console.log('ADMIN DISCON USER SOCKET ',disconnectedUserSocket);
			// let leavingUser = this.appService.users.filter( (user) => {
			// 	return user.socketID == disconnectedUserSocket;
			// });

			// let leavingUserIndex = this.appService.users.indexOf(leavingUser[0]);
			// if(leavingUserIndex > -1){
			// 	console.log("LEAVING USER INDEX: ",leavingUserIndex);
			// 	this.appService.users.splice(leavingUserIndex,1);
			// }

			// console.log("this.appService ",this.appService.messages);

			this.appService.reallyRemoveUser(disconnectedUserSocket);

			// console.log("USERS LEN AFTER ",this.usersList);
		})

		this.kickedUser = this.appService.getKickedUser().subscribe(kickedUser => {
      
	      // console.log("kickedUserkickedUser ",kickedUser);
	      // this.appService.processNewMessage(message);
	      // this.kick
	      // if(kickedUser['uID'] == this.userID){
	      //   // this.kicked = true;
	      //   console.log("KIICK ",kickedUser);
	      // }
	      // this.liveMessages = this.appService.liveMessages;

	      // remove their messages
			// console.log("BEFORE MESSAGES ",this.appService.messages);
			// console.log("USERS ",this.appService.messages);

			let tempMessages = this.appService.messages.filter(function( msgObj ) {
				return msgObj['uID'] !== kickedUser['uID'];
			});

			// this.appService.messages...uID != 0;
			this.zone.run(() => this.liveMessages = this.appService.messages = tempMessages);

			// this.appService.messages = tempMessages;

			// console.log("AFTER MESSAGES ",this.appService.messages);

			})
			}

	public bannerRotation(){
		setInterval (() => {
			this.bannerContent = this.bannerArr[Math.floor(Math.random() * this.bannerArr.length)];
		}, 6000);
	}

// BANNERS

	banner001 =`	  _________                                    _________                                     __  .__               
	 /   _____/ ____   ____  __ _________   ____   \\_   ___ \\  ____   ____   ____   ____   _____/  |_|__| ____   ____  
	 \\_____  \\_/ __ \\_/ ___\\|  |  \\_  __ \\_/ __ \\  /    \\  \\/ /  _ \\ /    \\ /    \\_/ __ \\_/ ___\\   __\\  |/  _ \\ /    \\ 
	 /        \\  ___/\\  \\___|  |  /|  | \\/\\  ___/  \\     \\___(  <_> )   |  \\   |  \\  ___/\\  \\___|  | |  (  <_> )   |  \\
	/_______  /\\___  >\\___  >____/ |__|    \\___  >  \\______  /\\____/|___|  /___|  /\\___  >\\___  >__| |__|\\____/|___|  /
	        \\/     \\/     \\/                   \\/          \\/            \\/     \\/     \\/     \\/                    \\/ `;

	banner002 =`	   _____                                         ___                                      .                   
	  (        ___    ___  ,   . .___    ___       .'   \\   __.  , __   , __     ___    ___  _/_   \`   __.  , __  
	   \`--.  .'   \` .'   \` |   | /   \\ .'   \`      |      .'   \\ |'  \`. |'  \`. .'   \` .'   \`  |    | .'   \\ |'  \`.
	      |  |----' |      |   | |   ' |----'      |      |    | |    | |    | |----' |       |    | |    | |    |
	 \\___.'  \`.___,  \`._.' \`._/| /     \`.___,       \`.__,  \`._.' /    | /    | \`.___,  \`._.'  \\__/ /  \`._.' /    |`;

	banner003 =`	  _____                             _____                            _   _             
	 / ____|                           / ____|                          | | (_)            
	| (___   ___  ___ _   _ _ __ ___  | |     ___  _ __  _ __   ___  ___| |_ _  ___  _ __  
	 \\___ \\ / _ \\/ __| | | | '__/ _ \\ | |    / _ \\| '_ \\| '_ \\ / _ \\/ __| __| |/ _ \\| '_ \\ 
	 ____) |  __/ (__| |_| | | |  __/ | |___| (_) | | | | | | |  __/ (__| |_| | (_) | | | |
	|_____/ \\___|\\___|\\__,_|_|  \\___|  \\_____\\___/|_| |_|_| |_|\\___|\\___|\\__|_|\\___/|_| |_|
	                                                                                       `;
	banner004 = `	  _   _   _   _   _   _     _   _   _   _   _   _   _   _   _   _  
	 / \\ / \\ / \\ / \\ / \\ / \\   / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ 
	( S | e | c | u | r | e ) ( C | o | n | n | e | c | t | i | o | n )
	 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/   \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ `;

	 banner005 = `	 _______                                ______                                __   __              
	|     __|.-----.----.--.--.----.-----. |      |.-----.-----.-----.-----.----.|  |_|__|.-----.-----.
	|__     ||  -__|  __|  |  |   _|  -__| |   ---||  _  |     |     |  -__|  __||   _|  ||  _  |     |
	|_______||_____|____|_____|__| |_____| |______||_____|__|__|__|__|_____|____||____|__||_____|__|__|`;

	banner006 = `	____ ____ ____ _  _ ____ ____    ____ ____ _  _ _  _ ____ ____ ___ _ ____ _  _ 
	[__  |___ |    |  | |__/ |___    |    |  | |\\ | |\\ | |___ |     |  | |  | |\\ | 
	___] |___ |___ |__| |  \\ |___    |___ |__| | \\| | \\| |___ |___  |  | |__| | \\| `;

	banner007 = `	 _____                            _____                             _   _             
	/  ___|                          /  __ \\                           | | (_)            
	\\ \`--.  ___  ___ _   _ _ __ ___  | /  \\/ ___  _ __  _ __   ___  ___| |_ _  ___  _ __  
	 \`--. \\/ _ \\/ __| | | | '__/ _ \\ | |    / _ \\| '_ \\| '_ \\ / _ \\/ __| __| |/ _ \\| '_ \\ 
	/\\__/ /  __/ (__| |_| | | |  __/ | \\__/\\ (_) | | | | | | |  __/ (__| |_| | (_) | | | |
	\\____/ \\___|\\___|\\__,_|_|  \\___|  \\____/\\___/|_| |_|_| |_|\\___|\\___|\\__|_|\\___/|_| |_|`;

	// banner008 = `	 ____                                            ____                                           __                           
	// /\\  _\`\\                                         /\\  _\`\\                                        /\\ \\__  __                    
	// \\ \\,\\L\\_\\     __    ___   __  __  _ __    __    \\ \\ \\/\\_\\    ___     ___     ___      __    ___\\ \\ ,_\\/\\_\\    ___     ___    
	//  \\/_\\__ \\   /'__\`\\ /'___\\/\\ \\/\\ \\/\\\`'__\\/'__\`\\   \\ \\ \\/_/_  / __\`\\ /' _ \`\\ /' _ \`\\  /'__\`\\ /'___\\ \\ \\/\\/\\ \\  / __\`\\ /' _ \`\\  
	//    /\\ \\L\\ \\/\\  __//\\ \\__/\\ \\ \\_\\ \\ \\ \\//\\  __/    \\ \\ \\L\\ \\/\\ \\L\\ \\/\\ \\/\\ \\/\\ \\/\\ \\/\\  __//\\ \\__/\\ \\ \\_\\ \\ \\/\\ \\L\\ \\/\\ \\/\\ \\ 
	//    \\ \`\\____\\ \\____\\ \\____\\\\ \\____/\\ \\_\\\\ \\____\\    \\ \\____/\\ \\____/\\ \\_\\ \\_\\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\__\\\\ \\_\\ \\____/\\ \\_\\ \\_\\
	//     \\/_____/\\/____/\\/____/ \\/___/  \\/_/ \\/____/     \\/___/  \\/___/  \\/_/\\/_/\\/_/\\/_/\\/____/\\/____/ \\/__/ \\/_/\\/___/  \\/_/\\/_/`;

	// banner009 = `	=========================================================================================================================
	// ==      ===============================================     =============================================================
	// =  ====  =============================================  ===  ============================================================
	// =  ====  ============================================  ============================================  ====================
	// ==  ========   ====   ===  =  ==  =   ====   ========  =========   ===  = ===  = ====   ====   ===    ==  ===   ===  = ==
	// ====  =====  =  ==  =  ==  =  ==    =  ==  =  =======  ========     ==     ==     ==  =  ==  =  ===  =======     ==     =
	// ======  ===     ==  =====  =  ==  =======     =======  ========  =  ==  =  ==  =  ==     ==  ======  ===  ==  =  ==  =  =
	// =  ====  ==  =====  =====  =  ==  =======  ==========  ========  =  ==  =  ==  =  ==  =====  ======  ===  ==  =  ==  =  =
	// =  ====  ==  =  ==  =  ==  =  ==  =======  =  ========  ===  ==  =  ==  =  ==  =  ==  =  ==  =  ===  ===  ==  =  ==  =  =
	// ==      ====   ====   ====    ==  ========   ==========     ====   ===  =  ==  =  ===   ====   ====   ==  ===   ===  =  =
	// =========================================================================================================================`;

	// banner010 = `	    ___       ___       ___       ___       ___       ___            ___       ___       ___       ___       ___       ___       ___       ___       ___       ___   
	//    /\\  \\     /\\  \\     /\\  \\     /\\__\\     /\\  \\     /\\  \\          /\\  \\     /\\  \\     /\\__\\     /\\__\\     /\\  \\     /\\  \\     /\\  \\     /\\  \\     /\\  \\     /\\__\\  
	//   /::\\  \\   /::\\  \\   /::\\  \\   /:/ _/_   /::\\  \\   /::\\  \\        /::\\  \\   /::\\  \\   /:| _|_   /:| _|_   /::\\  \\   /::\\  \\    \\:\\  \\   _\\:\\  \\   /::\\  \\   /:| _|_ 
	//  /\\:\\:\\__\\ /::\\:\\__\\ /:/\\:\\__\\ /:/_/\\__\\ /::\\:\\__\\ /::\\:\\__\\      /:/\\:\\__\\ /:/\\:\\__\\ /::|/\\__\\ /::|/\\__\\ /::\\:\\__\\ /:/\\:\\__\\   /::\\__\\ /\\/::\\__\\ /:/\\:\\__\\ /::|/\\__\\
	//  \\:\\:\\/__/ \\:\\:\\/  / \\:\\ \\/__/ \\:\\/:/  / \\;:::/  / \\:\\:\\/  /      \\:\\ \\/__/ \\:\\/:/  / \\/|::/  / \\/|::/  / \\:\\:\\/  / \\:\\ \\/__/  /:/\\/__/ \\::/\\/__/ \\:\\/:/  / \\/|::/  /
	//   \\::/  /   \\:\\/  /   \\:\\__\\    \\::/  /   |:\\/__/   \\:\\/  /        \\:\\__\\    \\::/  /    |:/  /    |:/  /   \\:\\/  /   \\:\\__\\    \\/__/     \\:\\__\\    \\::/  /    |:/  / 
	//    \\/__/     \\/__/     \\/__/     \\/__/     \\|__|     \\/__/          \\/__/     \\/__/     \\/__/     \\/__/     \\/__/     \\/__/               \\/__/     \\/__/     \\/__/  `;

	banner08 = `	____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
	||S |||e |||c |||u |||r |||e |||       |||C |||o |||n |||n |||e |||c |||t |||i |||o |||n ||
	||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
	|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|
	`;
}
