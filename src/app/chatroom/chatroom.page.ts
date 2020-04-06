import { Component, OnInit, ComponentFactoryResolver, ɵConsole, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
  import { UsersService } from '../users.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { NavController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  
  public ruid: string;
  public message: string;
  public sender : string;
  public usermesssage :any =[];

  @ViewChild(IonInfiniteScroll, {static : true}) infiniteScroll: IonInfiniteScroll;

  constructor(private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public user: UsersService,
    public afstore: AngularFirestore
    ) { 
      
        this.sender = this.user.getEmail();
    }

    loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.usermesssage.length == 3) {
          event.target.disabled = true;
        }
      }, 100);
    }
  
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    
    ngOnInit() {
      this.ruid = this.activatedRoute.snapshot.paramMap.get('id');
      this.getmessages();
    }

    async getmessages(){
    var element = [];
    await firebase.firestore().collection('messages').orderBy('createAt').get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        this.usermesssage.push(doc.data());
        // console.log(this.usermesssage2)
      });
    });

    console.log(this.usermesssage);
  }

  sendmsg(){
    const reciever = this.ruid;
    console.log(reciever);
    const message = this.message;
    const sender = this.sender;
    const createAt = new Date();
    console.log(createAt);
   
      this.afstore.collection('messages').add({
        reciever,
        message,
        sender,
        createAt,
    })
  
  }
}
