import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';
import { UsersService } from './users.service';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'mail'
    },
    {
      title: 'Sign up',
      url: '/signup',
      icon: 'paper-plane'
    },
    {
      title: 'people',
      url: '/people',
      icon: 'heart'
    },
    {
      title: 'Chat room',
      url: '/chatroom',
      icon: 'archive'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private authService: FirebaseService,
    public user: UsersService,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(){
    this.authService.logoutUser()
    .then(res => {
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
  
}
