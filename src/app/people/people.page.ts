import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { UsersService} from '../users.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  public selectedIndex = 0;
  public people = [];
  public email : string;

  constructor(public router:Router,
    private activatedRoute: ActivatedRoute,
    public user: UsersService,
    public afstore: AngularFirestore) {
      this.getUsers();
      this.email = this.user.getEmail();
    }
 

  ngOnInit() {
    const path = window.location.pathname.split('chatroom/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.people.findIndex(page => page.email.toLowerCase() === path.toLowerCase());
    }
  }

  async getUsers() {
      const markers = [];
      await firebase.firestore().collection('users').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
          markers.push(doc.data());
        });
      });
      this.people = markers;
      console.log(this.people);
      return markers;
    } 

}
