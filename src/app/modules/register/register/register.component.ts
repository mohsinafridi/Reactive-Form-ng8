
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomeValidator } from '../../../shared/validators/CustomValidator';
import { IUser } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/auth.service';
import { FirebaseService } from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  model: any = {};
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router
    ,         private firebaseService: FirebaseService) { }

  @Output() cancelRegister = new EventEmitter();
  user: IUser;
  ngOnInit() {
    this.createRegisterForm();

    this.user = {
      id: null,
      name: '',
      email: '',
      gender: '',
      password: ''
    };
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['female'],
      name: ['', Validators.required],
      email: ['', [Validators.required, CustomeValidator.emailDomainCheck('gmail.com')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    return group.get('password').value === group.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }


  register() {
    if (this.registerForm.valid) {
      // this.user = Object.assign({}, this.registerForm.value);
      this.mapFormDataToUserModel();
      this.firebaseService.createUser(this.user).then((result) => {
        this.router.navigate(['/reports']);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  mapFormDataToUserModel() {
    // this.user.id = this.registerForm.value.id,
    this.user.name = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.gender = this.registerForm.value.gender;
    this.user.password = this.registerForm.value.password;
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
