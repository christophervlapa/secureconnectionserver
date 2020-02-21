import { Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
// import {EventEmitter} from '@angular/common/src/facade/async';
import { AppService } from '../app.service';

@Component({
  selector: 'app-feed',
  providers: [],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

	message;
	newFlag;
  connection;
  liveMessages: any = [];
	activeInput: boolean;
  userID;
  kicked: boolean = false;
  kickedUser;
  // liveMessages: any = [];

  constructor(private appService:AppService, public zone: NgZone) { }

  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  sendMessage(){

    let newMessage = {
      text: this.message,
      uID: this.userID,
      timestamp: new Date().getTime()
    }

    if(this.message !== "" && !(/^\s*$/.test(this.message))){
      this.appService.sendMessage(newMessage);

      // TODO check for flags here??
      // console.log('FEED COMP sendMessage',newMessage);
      
    }

      newMessage = null;
      this.activeInput = false;

      this.message = '';
      this.myFocusTriggeringEventEmitter.emit(false);
    
    // console.log(this.myFocusTriggeringEventEmitter);
  }

  sendMessageOnKeypress(keyCode){
    // On enter
    if(keyCode == 13) {
      this.sendMessage();
      // this.activeInput = false;
    }
  }

  toggleInputActive(inputActive){
    this.activeInput = (inputActive) ? true : false;
  }

  ngOnInit() {
  	// console.log('FeedComponent init');

    // this.liveMessages = this.appService.messages;
    // push unique id to array
    let timestamp = new Date().getTime();
    let randoNumber = Math.floor((Math.random() * 10000000000000) + 1);

    this.userID = (timestamp + randoNumber).toString(36);     

    // ADD USER
    // console.log("USERS LEN ",this.appService.getUserList().length);
    this.appService.addUser(this.userID);

    this.connection = this.appService.getMessages().subscribe(message => {
      
      this.appService.processNewMessage(message);

      this.liveMessages = this.appService.messages.sort((a,b) => {
      // console.log("A ",a.flagIDs.length);
        return b.msgID - a.msgID;
      });

      // this.liveMessages = this.appService.liveMessages;

    })

    this.kickedUser = this.appService.getKickedUser().subscribe(kickedUser => {
      
      // console.log("kickedUserkickedUser ",kickedUser);
      // this.appService.processNewMessage(message);
      // this.kick
      if(kickedUser['uID'] == this.userID){
        this.kicked = true;
        // console.log("KIICK ",kickedUser);
      }

      let tempMessages = this.appService.messages.filter(function( msgObj ) {
        return msgObj['uID'] !== kickedUser['uID'];
      });

      this.zone.run(() => this.liveMessages = this.appService.messages = tempMessages);

      // this.liveMessages = this.appService.liveMessages;

    })

    // console.log("KICKED CLIENT ",this.kickedUser);


  }
}
