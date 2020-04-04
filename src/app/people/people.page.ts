import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  public selectedIndex = 0;
  public people = [
    {
      name: 'zain'
    },
    {
      name: 'Ghazi'
    },
    {
      name: 'Haziq'
    },
    {
      name: 'Zohaib'
    }
  ];
  constructor(public router:Router) { }
 

  ngOnInit() {
    const path = window.location.pathname.split('chatroom/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.people.findIndex(page => page.name.toLowerCase() === path.toLowerCase());
    }
  }

}
