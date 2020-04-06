import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'confrim_password': [
      { type: 'required', message: 'confirm Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor( private navCtrl: NavController,
    private authService: FirebaseService,
    private formBuilder: FormBuilder) { }


    ngOnInit(){
      this.validations_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])),
        confrim_password: new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])),
      }, { 
        validators: this.password.bind(this)
      });
    }

    password(formGroup: FormGroup) {
      const { value: password } = formGroup.get('password');
      const { value: confirm_Password } = formGroup.get('confrim_password');
      return password === confirm_Password ? null : { passwordNotMatch: true };
    }
  
   
    tryRegister(value){
      this.authService.registerUser(value)
       .then(res => {
         console.log(res);
         this.errorMessage = "";
         this.successMessage = "Your account has been created. Please log in.";
         this.navCtrl.navigateForward('/login');
       }, err => {
         console.log(err);
         this.errorMessage = err.message;
         this.successMessage = "";
       })
    }
   
    goLoginPage(){
      this.navCtrl.navigateBack('');
    }

}
