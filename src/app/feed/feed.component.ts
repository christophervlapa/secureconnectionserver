import { Component, OnInit, Output, EventEmitter, NgZone} from '@angular/core';
import { AppService } from '../app.service';
import { UserService } from '../common/user.service';

@Component({
  // chat-feed
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

	message: string;
	newFlag: any;
  connection: any;
  liveMessages: any = [];
	activeInput: boolean;
  userID: any;
  kicked: boolean = false;
  kickedUser: any;

  constructor(
    private appService:AppService, 
    public zone: NgZone,
    public userService:UserService
    
    ) { }

  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();

  sendMessage(){

    let newMessage = {
      text: this.message,
      uID: this.userID,
      timestamp: new Date().getTime()
    }

    if(this.message !== "" && !(/^\s*$/.test(this.message))){
      this.appService.sendMessage(newMessage);      
    }

      newMessage = null;
      this.activeInput = false;

      this.message = '';
      this.myFocusTriggeringEventEmitter.emit(false);
  }

  sendMessageOnKeypress(keyCode){
    // On enter
    if(keyCode == 13) {
      this.sendMessage();
    }
  }

  toggleInputActive(inputActive){
    this.activeInput = (inputActive) ? true : false;
  }

  ngOnInit() {
    let timestamp = new Date().getTime();
    let randoNumber = Math.floor((Math.random() * 10000000000000) + 1);

    this.userID = (timestamp + randoNumber).toString(36);     

    // ADD USER
    this.userService.addUser(this.userID);

    this.connection = this.appService.getMessages().subscribe(message => {
      
      this.appService.processNewMessage(message);

      this.liveMessages = this.appService.messages.sort((a,b) => {
        return b.msgID - a.msgID;
      });
    })

    this.kickedUser = this.userService.getKickedUser().subscribe(kickedUser => {
      
      if(kickedUser['uID'] == this.userID){
        this.kicked = true;
      }

      let tempMessages = this.appService.messages.filter(function( msgObj ) {
        return msgObj['uID'] !== kickedUser['uID'];
      });

      this.zone.run(() => this.liveMessages = this.appService.messages = tempMessages);
    })

    // console.log("KICKED CLIENT ",this.kickedUser);


  }
}
