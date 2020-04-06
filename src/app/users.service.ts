import { Injectable } from '@angular/core';

interface user {
  email : string,
  uid: string 
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user : user;

  constructor() { }

  setUser(user:user){
    this.user = user
  }

  getUID(){
    if(this.user.uid){
      return this.user.uid
    }
  }

  getEmail(){
    return this.user.email
  }
  
}
