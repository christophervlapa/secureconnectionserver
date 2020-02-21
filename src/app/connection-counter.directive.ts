import { Directive } from '@angular/core';

@Directive({
  selector: '[appConnectionCounter]'
})
export class ConnectionCounterDirective {

  constructor() { 

  }

  ngOnInit(){
  	// userTimeConnected(connectedTimestamp){
    var rightNow = new Date().getTime();

    // return rightNow - connectedTimestamp;
  // }
  }

}
