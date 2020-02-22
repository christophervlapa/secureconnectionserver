
import {throwError as observableThrowError,  Subject ,  Observable } from 'rxjs';

import {catchError, tap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';





@Injectable()
export class AppService {
  private url = 'http://localhost:5000';
  // private url = 'http://192.168.1.1:5000';
  private socket;

  public messages: any = [];
  public users: any = [];
  public liveMessages = '';
  private newFlag = '';

  // private allSameCharsRegex = new RegExp('/^(.)\1+$/');
  // private handleError;

  constructor(private http: Http) {
         var obj;
         // this.getProbez().subscribe(data => obj=data, error => console.log(error));
    }

    // https://stackoverflow.com/questions/39406043/how-to-fetch-json-file-in-angular-2

  // public getProbez(): Observable<any> {
  //   return this.http.get("./assets/probelog.json")
  //                   .map((res:any) => res.json())
  //                   .catch(this.handleError);
  // }

  userTimeConnected(connectedTimestamp){
    var rightNow = new Date().getTime();

    return rightNow - connectedTimestamp;
  }

  addUser(uid){     
      this.socket.emit('connectUser', uid);
  }

  getUserByID(uid){
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

  reallyRemoveUser(disconnectSocket){
    let leavingUser = this.users.filter( (user) => {
        return user.socketID == disconnectSocket;
      });

      let leavingUserIndex = this.users.indexOf(leavingUser[0]);
      if(leavingUserIndex > -1){
        // console.log("LEAVING USER INDEX: ",leavingUserIndex);
        this.users.splice(leavingUserIndex,1);
      }
  }

  kickUser(uid){
    // console.log("SERVICE ",uid);
    // get user obj
    let tempUobj = this.getUserByID(uid);

    this.socket.emit('kickUser', tempUobj);
  }
  
  sendMessage(message){
    this.socket.emit('newMessage', message);    
  }

  getProbez() {
    return this.http.get('assets/probelog.json').pipe(
      map((response: Response) => response.json()),
      tap(data => {

      }), // + JSON.stringify(data)
      catchError(this.handleError),);
  }

  handleError(error: Response) {
    // console.log(error);
    return observableThrowError(error.json().error || 'Server error');
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })     
    return observable;
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

  processNewMessage(message){



      message['text'] = this.profanityFilter(message['text']);

      this.messages.push(message);
    // console.log("MSG ",message);

      this.newFlag = this.flagChecker(message);

      // Send message to flag checker
      if(this.newFlag !== null){

        var userObj = this.users.filter(x => x.uID === message['uID']);
        if(userObj[0]){
          if(!userObj[0].flagIDs.filter(x => x === this.newFlag)[0]){
            userObj[0].flagIDs.push(this.newFlag);
          }
        }
      }

      this.users.sort((a,b) => {
        // console.log("A ",a.flagIDs.length);
        return b.flagIDs.length - a.flagIDs.length;
      });
      // console.log("PROCESS MSG ",message);
      
      // this.liveMessages = '<li><ul><li>' + message['uID'] + ':</li><li>' + message['text'] + '</li></ul></li>\n\r' + this.liveMessages;
  }

  flagChecker(message){

    // message = message['text'];



    // console.log(message);

    // FLAG ONE 'hello world'
    if(message['text'].toLowerCase().indexOf('vote yes') > -1) {
      
      // message['flagIDs'].push('voteYes001');
      message['flagClasses'] = 'voteYes001';
      var chars = message['text'].split("");
      message['text'] = '<span>' + chars.join('</span><span>') + '</span>';  
      return "001";

    } else if(message['text'].toLowerCase().indexOf('red') > -1) { // FALG 3 'lol' in the post geg a flag
      
      message['flagClasses'] = 'red';
      return "002";

    } else if(message['text'].toLowerCase().indexOf('blue') > -1) { // FLAG 4 use all 64 charachters
      
      message['flagClasses'] = 'blue';

      return "003";

    } else if (message['text'].toLowerCase().indexOf('trump') > -1){ // repeat a word twice
      message['flagClasses'] = 'orange';
      return "004";

    } else if (message['text'].toLowerCase().indexOf('mona') > -1){ // Say mona in msg
      message['flagClasses'] = 'monaFlag';
      return "004";

    } else if (message['text'].toLowerCase().indexOf('party') > -1){ // Say sex in msg
      
      message['text'] = "PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! PARTY! Drugs are bad."
      message['flagClasses'] = 'party-blinker';
      return "005";

    } else if (message['text'].toLowerCase().indexOf(message['uID'].toLowerCase()) > -1){ // 'vote yes' gets a point
      
      return "006";

    // } else if (this.allSameCharsRegex.test(message['text'])){ // all the same letters
    //   return "007";

    } else if (message['text'].toLowerCase().indexOf('secureconnection') > -1){ // Say secureconnection
      return "007";

    } else if (message['text'].toLowerCase().indexOf('hobiennale') > -1 || message['text'].toLowerCase().indexOf('hb17') > -1){ // Say secureconnection
      return "008";

    } else if(message['text'].toLowerCase().indexOf('yellow') > -1) { // FLAG 4 use all 64 charachters
    
    message['flagClasses'] = 'yellow';

    return "009";

  } else if(message['text'].toLowerCase().indexOf('wtf') > -1){
    return "010";
    // } else if (){ // Coulor change on 'red' or such

    // } else if (){ // Type 'revolution' in msg

    // } else if (){ // use the word 'proximal'

    // } else if (){ // Type 'reboot' main chat is reset to blank screen

    // } else if (){ // Find the word happy replace 64 with HAPPYHAPPYJOYJOYHAPPYHAPPYJOYJOY

    // } else if (){ // names of tasmanian towns

    // } else if (){ // Names of MONA artists

    // } else if (){  // say 'extra'

    // } else if (){ // say 'electric'

    // } else if (){ // Non english msg get flag


    // !!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!!! MULTI USER FLAGS !!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!

    // } else if (this.twoInARowCheck(message)){ // Names of MONA artists
      
      // console.log("TWO INA ROW CHECK ",this.twoInARowCheck(message));
      // console.log("TWO IN A ROW");
      // let user2 = this.users.findIndex(i => i.uID == this.twoInARowCheck(message));
      // console.log('user2 ',user2);
      // this.users[user2].flagIDs.push('006');
      // return "006-"+this.twoInARowCheck(message);

//     } else if(this.xInARowCheck(message,3) != null) { // THREE IN A ROW
// console.log('THREE IN A ROW ',this.xInARowCheck(message,3).length);
//       // OTHER USERS FLAGS

//       return "007";

    // Two partypartyparty msg proximal

    // three partypartyparty ||

    // four partypartyparty ||

    // Non proximal posts get flags

    // 

    // 
    } else { // NO FLAGS
      return null;
    }
  }

  // twoInARowCheck(message){

  //   // get the prev message text

  //   let thisItemIndex = this.messages.findIndex(i => i.msgID === message['msgID']);
  //   let previousItemIndex = thisItemIndex - 1;


  //   if(previousItemIndex > -1 && message['text'] == this.messages[previousItemIndex]['text']){
  //     return message['uID']+"-"+this.messages[previousItemIndex]['uID'];
  //   }
    // let previousItem2nd = thisItemIndex - 2;
    // let previousItem3nd = thisItemIndex - 3;
    // let previousItem4nd = thisItemIndex - 4;
    // let previousItem5nd = thisItemIndex - 5;

    // for(var msg of this.messages){
      
    // }
    // if(this.messages.length > 1){

    //   this.messages.forEach((msg, index) => {
    //     console.log(index);
    //     if(index > 0 && message['text'] == this.messages[index-1]['text']){ // TWO IN A ROW
    //       // console.log(msg['text']);
    //       // console.log(this.messages[index-1]['text']);
    //       console.log("TWO!!!!");
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });
    // }
    

    // console.log("This item text: ",message['text']);
    // // console.log("Next item text: ",message[nextItemIndex]['text']);
    // console.log("Prev item text: ",this.messages[previousItemIndex]['text']);
    // console.log("Prev item 2 text: ",this.messages[previousItem2nd]['text']);
    // console.log("Prev item 3 text: ",this.messages[previousItem3nd]['text']);
    // console.log("Prev item 4 text: ",this.messages[previousItem4nd]['text']);
    // console.log("Prev item 5 text: ",this.messages[previousItem5nd]['text']);

    // console.log("ALL MESSAGES ",this.messages);
    // // get the next message text
  // }

//   xInARowCheck(message,x){

//     // get the prev message text
//     var flagUsers = [];

//     let thisItemIndex = this.messages.findIndex(i => i.msgID === message['msgID']);
//     // let previousItemIndex = thisItemIndex - 1;
//     // let previousItem2Index = thisItemIndex - 2;
//     // let previousItem3Index = thisItemIndex - 3;

//     // loop through previous 3 messages

//     if(thisItemIndex > 0){
//       for(var i=thisItemIndex; i < x; i++){
//         var prevIndex = thisItemIndex - i;
// console.log("PREV INDEX ",prevIndex);
//         if(message['text'] === this.messages[prevIndex]['text']){
//           flagUsers.push(this.messages[i]['uID']);
//         }
//       }
//     }
    

//     if(flagUsers.length === 3){
//       return flagUsers;
//     } else {
//       return null;
//     }
    

//     // if(previousItemIndex > -1 && message['text'] == this.messages[previousItemIndex]['text']){
//     //   return this.messages[previousItemIndex]['uID'];
//     // }
    
//   }


  // Find swear words and ban em
  profanityFilter(message){
    let profanityArr = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
    let adjectivesArr = ["aback","abaft","abandoned","abashed","aberrant","abhorrent","abiding","abject","ablaze","able","abnormal","aboard","aboriginal","abortive","abounding","abrasive","abrupt","absent","absorbed","absorbing","abstracted","absurd","abundant","abusive","acceptable","accessible","accidental","accurate","acid","acidic","acoustic","acrid","actually","ad","hoc","adamant","adaptable","addicted","adhesive","adjoining","adorable","adventurous","afraid","aggressive","agonizing","agreeable","ahead","ajar","alcoholic","alert","alike","alive","alleged","alluring","aloof","amazing","ambiguous","ambitious","amuck","amused","amusing","ancient","angry","animated","annoyed","annoying","anxious","apathetic","aquatic","aromatic","arrogant","ashamed","aspiring","assorted","astonishing","attractive","auspicious","automatic","available","average","awake","aware","awesome","awful","axiomatic","bad","barbarous","bashful","bawdy","beautiful","befitting","belligerent","beneficial","bent","berserk","best","better","bewildered","big","billowy","bite-sized","bitter","bizarre","black","black-and-white","bloody","blue","blue-eyed","blushing","boiling","boorish","bored","boring","bouncy","boundless","brainy","brash","brave","brawny","breakable","breezy","brief","bright","bright","broad","broken","brown","bumpy","burly","bustling","busy","cagey","calculating","callous","calm","capable","capricious","careful","careless","caring","cautious","ceaseless","certain","changeable","charming","cheap","cheerful","chemical","chief","childlike","chilly","chivalrous","chubby","chunky","clammy","classy","clean","clear","clever","cloistered","cloudy","closed","clumsy","cluttered","coherent","cold","colorful","colossal","combative","comfortable","common","complete","complex","concerned","condemned","confused","conscious","cooing","cool","cooperative","coordinated","courageous","cowardly","crabby","craven","crazy","creepy","crooked","crowded","cruel","cuddly","cultured","cumbersome","curious","curly","curved","curvy","cut","cute","cute","cynical","daffy","daily","damaged","damaging","damp","dangerous","dapper","dark","dashing","dazzling","dead","deadpan","deafening","dear","debonair","decisive","decorous","deep","deeply","defeated","defective","defiant","delicate","delicious","delightful","demonic","delirious","dependent","depressed","deranged","descriptive","deserted","detailed","determined","devilish","didactic","different","difficult","diligent","direful","dirty","disagreeable","disastrous","discreet","disgusted","disgusting","disillusioned","dispensable","distinct","disturbed","divergent","dizzy","domineering","doubtful","drab","draconian","dramatic","dreary","drunk","dry","dull","dusty","dynamic","dysfunctional","eager","early","earsplitting","earthy","easy","eatable","economic","educated","efficacious","efficient","eight","elastic","elated","elderly","electric","elegant","elfin","elite","embarrassed","eminent","empty","enchanted","enchanting","encouraging","endurable","energetic","enormous","entertaining","enthusiastic","envious","equable","equal","erect","erratic","ethereal","evanescent","evasive","even excellent excited","exciting exclusive","exotic","expensive","extra-large extra-small exuberant","exultant","fabulous","faded","faint fair","faithful","fallacious","false familiar famous","fanatical","fancy","fantastic","far"," far-flung"," fascinated","fast","fat faulty","fearful fearless","feeble feigned","female fertile","festive","few fierce","filthy","fine","finicky","first"," five"," fixed"," flagrant","flaky","flashy","flat","flawless","flimsy"," flippant","flowery","fluffy","fluttering"," foamy","foolish","foregoing","forgetful","fortunate","four frail","fragile","frantic","free"," freezing"," frequent"," fresh"," fretful","friendly","frightened frightening full fumbling functional","funny","furry furtive","future futuristic","fuzzy ","gabby","gainful","gamy","gaping","garrulous","gaudy","general gentle","giant","giddy","gifted","gigantic","glamorous","gleaming","glib","glistening glorious","glossy","godly","good","goofy","gorgeous","graceful","grandiose","grateful gratis","gray greasy great","greedy","green grey grieving","groovy","grotesque","grouchy","grubby gruesome","grumpy","guarded","guiltless","gullible gusty","guttural H habitual","half","hallowed","halting","handsome","handsomely","handy","hanging","hapless","happy","hard","hard-to-find","harmonious","harsh","hateful","heady","healthy","heartbreaking","heavenly heavy hellish","helpful","helpless","hesitant","hideous high","highfalutin","high-pitched","hilarious","hissing","historical","holistic","hollow","homeless","homely","honorable","horrible","hospitable","hot huge","hulking","humdrum","humorous","hungry","hurried","hurt","hushed","husky","hypnotic","hysterical","icky","icy","idiotic","ignorant","ill","illegal","ill-fated","ill-informed","illustrious","imaginary","immense","imminent","impartial","imperfect","impolite","important","imported","impossible","incandescent","incompetent","inconclusive","industrious","incredible","inexpensive","infamous","innate","innocent","inquisitive","insidious","instinctive","intelligent","interesting","internal","invincible","irate","irritating","itchy","jaded","jagged","jazzy","jealous","jittery","jobless","jolly","joyous","judicious","juicy","jumbled","jumpy","juvenile","kaput","keen","kind","kindhearted","kindly","knotty","knowing","knowledgeable","known","labored","lackadaisical","lacking","lame","lamentable","languid","large","last","late","laughable","lavish","lazy","lean","learned","left","legal","lethal","level","lewd","light","like","likeable","limping","literate","little","lively","lively","living","lonely","long","longing","long-term","loose","lopsided","loud","loutish","lovely","loving","low","lowly","lucky","ludicrous","lumpy","lush","luxuriant","lying","lyrical","macabre","macho","maddening","madly","magenta","magical","magnificent","majestic","makeshift","male","malicious","mammoth","maniacal","many","marked","massive","married","marvelous","material","materialistic","mature","mean","measly","meaty","medical","meek","mellow","melodic","melted","merciful","mere","messy","mighty","military","milky","mindless","miniature","minor","miscreant","misty","mixed","moaning","modern","moldy","momentous","motionless","mountainous","muddled","mundane","murky","mushy","mute","mysterious","naive","nappy","narrow","nasty","natural","naughty","nauseating","near","neat","nebulous","necessary","needless","needy","neighborly","nervous","new","next","nice","nifty","nimble","nine","nippy","noiseless","noisy","nonchalant","nondescript","nonstop","normal","nostalgic","nosy","noxious","null","numberless","numerous","nutritious","nutty","oafish","obedient","obeisant","obese","obnoxious","obscene","obsequious","observant","obsolete","obtainable","oceanic","odd","offbeat","old","old-fashioned","omniscient","one","onerous","open","opposite","optimal","orange","ordinary","organic","ossified","outgoing","outrageous","outstanding","oval","overconfident","overjoyed","overrated","overt","overwrought","painful","painstaking","pale","paltry","panicky","panoramic","parallel","parched","parsimonious","past","pastoral","pathetic","peaceful","penitent","perfect","periodic","permissible","perpetual","petite","petite","phobic","physical","picayune","pink","piquant","placid","plain","plant","plastic","plausible","pleasant","plucky","pointless","poised","polite","political","poor","possessive","possible","powerful","precious","premium","present","pretty","previous","pricey","prickly","private","probable","productive","profuse","protective","proud","psychedelic","psychotic","public","puffy","pumped","puny","purple","purring","pushy","puzzled","puzzling","quack","quaint","quarrelsome","questionable","quick","quickest","quiet","quirky","quixotic","quizzical","rabid","racial","ragged","rainy","rambunctious","rampant","rapid","rare","raspy","ratty","ready","real","rebel","receptive","recondite","red","redundant","reflective","regular","relieved","remarkable","reminiscent","repulsive","resolute","resonant","responsible","rhetorical","rich","right","righteous","rightful","rigid","ripe","ritzy","roasted","robust","romantic","roomy","rotten","rough","round","royal","ruddy","rude","rural","rustic","ruthless","sable","sad","safe","salty","same","sassy","satisfying","savory","scandalous","scarce","scared","scary","scattered","scientific","scintillating","scrawny","screeching","second","second-hand","secret","secretive","sedate","seemly","selective","selfish","separate","serious","shaggy","shaky","shallow","sharp","shiny","shivering","shocking","short","shrill","shut","shy","sick","silent","silent","silky","silly","simple","simplistic","sincere","six","skillful","skinny","sleepy","slim","slimy","slippery","sloppy","slow","small","smart","smelly","smiling","smoggy","smooth","sneaky","snobbish","snotty","soft","soggy","solid","somber","sophisticated","sordid","sore","sore","sour","sparkling","special","spectacular","spicy","spiffy","spiky","spiritual","spiteful","splendid","spooky","spotless","spotted","spotty","spurious","squalid","square","squealing","squeamish","staking","stale","standing","statuesque","steadfast","steady","steep","stereotyped","sticky","stiff","stimulating","stingy","stormy","straight","strange","striped","strong","stupendous","stupid","sturdy","subdued","subsequent","substantial","successful","succinct","sudden","sulky","super","superb","superficial","supreme","swanky","sweet","sweltering","swift","symptomatic","synonymous","taboo","tacit","tacky","talented","tall","tame","tan","tangible","tangy","tart","tasteful","tasteless","tasty","tawdry","tearful","tedious","teeny","teeny-tiny","telling","temporary","ten","tender tense","tense","tenuous","terrible","terrific","tested","testy","thankful","therapeutic","thick","thin","thinkable","third","thirsty","thoughtful","thoughtless","threatening","three","thundering","tidy","tight","tightfisted","tiny","tired","tiresome","toothsome","torpid","tough","towering","tranquil","trashy","tremendous","tricky","trite","troubled","truculent","true","truthful","two","typical","ubiquitous","ugliest","ugly","ultra","unable","unaccountable","unadvised","unarmed","unbecoming","unbiased","uncovered","understood","undesirable","unequal","unequaled","uneven","unhealthy","uninterested","unique","unkempt","unknown","unnatural","unruly","unsightly","unsuitable","untidy","unused","unusual","unwieldy","unwritten","upbeat","uppity","upset","uptight","used","useful","useless","utopian","utter","uttermost","vacuous","vagabond","vague","valuable","various","vast","vengeful","venomous","verdant","versed","victorious","vigorous","violent","violet","vivacious","voiceless","volatile","voracious","vulgar","wacky","waggish","waiting","","wakeful","wandering","wanting","warlike","warm","wary","wasteful","watery","weak","wealthy","weary","well-groomed","well-made","well-off","well-to-do","wet","whimsical","whispering","white","whole","wholesale","wicked","wide","wide-eyed","wiggly","wild","willing","windy","wiry","wise","wistful","witty","woebegone","womanly","wonderful","wooden","woozy","workable","worried","worthless","wrathful","wretched","wrong","wry","xenophobic","yellow","yielding","young","youthful","yummy","zany","zealous","zesty","zippy","zonked"];

    let animalsArr = ["Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra"]

    let basicSecure = ["<img","<a","<a href=","<script>","</script>"];
    for(let swearVal of profanityArr){
      if(message && message.indexOf(swearVal) > -1){
        let randomAdj = adjectivesArr[Math.floor(Math.random() * adjectivesArr.length)];
        message = message.replace(swearVal, randomAdj);
      }
    }

    for(let hackVal of basicSecure){
      if(message && message.indexOf(hackVal) > -1){
        let randomAnimal = animalsArr[Math.floor(Math.random() * animalsArr.length)];
        message = "<--- 1337 |-|4><0r "+randomAnimal.toLowerCase()+" (:";
      }
    }

    return message;
  }

  // TEXT STUFF
  private coloursArr = [{"red":"FF0000"},{"blue":"00FF00"}];
}