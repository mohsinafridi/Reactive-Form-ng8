import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomeValidator } from './../../../shared/validators/CustomValidator';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    fullName: '',
    email: '',
    confirmemail: '',
    emailGroup: '',
    phone: '',
    skillName: '',
    experience: '',
    proficiency: ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    fullName: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be greater than 2 characters.',
      maxlength: 'Full Name must be less than 10 characters.'
    },
    email: {
      required: 'Email is required.',
      emailDomain: 'Email should contain domain mohsin.com.'
    },
    confirmemail: {
      required: 'Confirm Email is required.',
    },
    emailGroup: {
      emailMisMatch : 'Email and Confirm Email does not match.',
    },
    phone: {
      required: 'Phone is required.',
      whitespace: 'No White Space in Phone Number.'
    },
    skillName: {
      required: 'Skill Name is required.',
      whitespace: 'No White Space in Skill Name.'
    },
    experience: {
      required: 'Experience is required.',
      whitespace: 'No White Space in Experience.'
    },
    proficiency: {
      required: 'Proficiency is required.'
    },
  };

  ngOnInit() {
    // this.employeeForm = new FormGroup({ // 1.

    this.employeeForm = this.fb.group({   // 2.
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      contactPreferences: ['email'],

      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomeValidator.emailDomainCheck('mohsin.com')]],
        confirmemail: ['', Validators.required],
      } , { validator : matchEmail}),

      phone: ['', CustomeValidator.noWhitespaceValidator],
      // Create skills form group
      skills: this.fb.group({
        skillName: ['', [Validators.required, CustomeValidator.noWhitespaceValidator]],
        experience: ['', [Validators.required, CustomeValidator.noWhitespaceValidator]],
        proficiency: ['', Validators.required]
      })
    });

    this.employeeForm.get('contactPreferences').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    // Below Code is for Observable "ValueChanges" for form or single control
    // this.employeeForm.valueChanges  -> For Full Form.
    // this.employeeForm.get('fullName').valueChanges.subscribe((value: string) => {
    //  this.fullNameLength = value.length;
    // });

  }

  onLoadDataClick(): void {
    // setValue -> for full form
    // patchValue -> for full and partial form data.

    // this.employeeForm.patchValue({
    //   fullName: 'Mohisn Azam',
    //   email: 'moaz@ciklum.com',
    //   skills: {
    //     skillName: 'Angular',
    //     experience: '5',
    //     proficiency: 'beginner'
    //   }
    // });


    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }

  onContactPreferenceChange(seletedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (seletedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    // console.log(Object.keys(group.controls));  // get all Control Keys.

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = ''; //  Clear the existing validation errors.
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      // console.log('Key = ' + key + '& Value is ' + abstractControl.value);
      // abstractControl.markAsDirty();

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }
}

function matchEmail(group: AbstractControl) {
  const email = group.get('email');
  const confirmemail = group.get('confirmemail');

  if (email.value === confirmemail.value || confirmemail.pristine) { return null; } else {
    return { 'emailMisMatch': true };
  }
}
