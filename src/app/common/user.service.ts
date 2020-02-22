import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { SIO_TOKEN } from '../common/socket-io.service';

import { GlobalVariables } from '../common/globals';

@Injectable()
export class UserService {

  constructor(
    @Inject(SIO_TOKEN) public io:any,
    private globals:GlobalVariables,

  ){}

  public users: any = [];
  private socket:any;

  private subject = new Subject<any>();

  addUser(uid: number){     
      this.socket.emit('connectUser', uid);
  }

  getUserByID(uid: string){
    return this.users.find(x => x.uID === uid);
  }

  removeUser(){
    let observable = new Observable(observer => {
      this.socket = this.socket(this.globals.constants.nodeServerUrl);
      this.socket.on('disconnectedUser', (data:any) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })     
    return observable;
  }

  reallyRemoveUser(disconnectSocket: any){
    let leavingUser = this.users.filter( (user) => {
        return user.socketID == disconnectSocket;
      });

      let leavingUserIndex = this.users.indexOf(leavingUser[0]);
      if(leavingUserIndex > -1){
        this.users.splice(leavingUserIndex,1);
      }
  }

  kickUser(uid: string){
    let tempUobj = this.getUserByID(uid);

    this.socket.emit('kickUser', tempUobj);
  }

  getNewUser() {
      let observable = new Observable(observer => {
        this.socket = this.io(this.globals.constants.nodeServerUrl);
        this.socket.on('newUser', (data) => {
          observer.next(data);   
        });
        return () => {
          this.socket.disconnect();
        }; 
      })
  
      return observable;
    }
  
    getKickedUser() {
      let observable = new Observable(observer => {
        this.socket = this.io(this.globals.constants.nodeServerUrl);
        this.socket.on('kickedUser', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        }; 
      })
  
      return observable;
    }
  
    getUserListLength(){
      return this.users.length;
    }
}