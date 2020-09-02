import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fullNameLength = 0;

  constructor(private fb: FormBuilder) { }
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYears: '',
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
      required: 'Email is required.'
    },
    skillName: {
      required: 'Skill Name is required.',
    },
    experienceInYears: {
      required: 'Experience is required.',
    },
    proficiency: {
      required: 'Proficiency is required.',
    },
  };

  ngOnInit() {
    // this.employeeForm = new FormGroup({ // 1.

    this.employeeForm = this.fb.group({   // 2.
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', Validators.required],
      // Create skills form group
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experience: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
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
  }


  logValidationErrors(group: FormGroup): void {
    // console.log(Object.keys(group.controls));  // get all Control Keys.

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else { // If the control is a FormControl
        this.formErrors[key] = ''; //  Clear the existing validation errors.
        if (abstractControl && !abstractControl.valid) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
        // console.log('Key = ' + key + '& Value is ' + abstractControl.value);
        // abstractControl.markAsDirty();
      }
    });
  }
}
