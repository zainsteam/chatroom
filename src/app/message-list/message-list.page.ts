import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { UsersService} from '../users.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {
  public messages = [];
  constructor( private authService: FirebaseService,
    public router:Router,
    private activatedRoute: ActivatedRoute,
    public user: UsersService,
    public afstore: AngularFirestore
    ) { 
    this.getMeassage();

    }

  ngOnInit() {
    // var userEmail = this.authService.userDetails();
    // console.log(userEmail);
  }

  async getMeassage() {
    const markers = [];
    const id = this.user.getUID;
    await firebase.firestore().collection('messages').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        markers.push(doc.data());
      });
    });
    this.messages = markers;
    console.log(this.messages);
    return markers;
  } 

}
