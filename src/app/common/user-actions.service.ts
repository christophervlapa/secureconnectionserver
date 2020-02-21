import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserActions {
    private subject = new Subject<any>();

    addUser(uid: number){     
        this.socket.emit('connectUser', uid);
    }
  
    getUserByID(uid: string){
      return this.users.find(x => x.uID === uid);
    }
  
    removeUser(){
      let observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on('disconnectedUser', (data) => {
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
          // console.log("LEAVING USER INDEX: ",leavingUserIndex);
          this.users.splice(leavingUserIndex,1);
        }
    }
  
    kickUser(uid: string){
      // console.log("SERVICE ",uid);
      // get user obj
      let tempUobj = this.getUserByID(uid);
  
      this.socket.emit('kickUser', tempUobj);
    }

    getNewUser() {
        let observable = new Observable(observer => {
          this.socket = io(this.url);
          this.socket.on('newUser', (data) => {
            observer.next(data);   
            // console.log('SERVICE NEW USER ',data); 
            // this.users.push(data);
          });
          return () => {
            // @TODO probs update to @Output()??
            this.socket.disconnect();
          }; 
        })
    
        return observable;
      }
    
      getKickedUser() {
        let observable = new Observable(observer => {
          this.socket = io(this.url);
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