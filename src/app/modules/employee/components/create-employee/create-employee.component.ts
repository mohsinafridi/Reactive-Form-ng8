import { ISkill } from '../../models/ISkill';
import { IEmployee } from '../../models/IEmployee';
import { EmployeeService } from '../../employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomeValidator } from '../../../../shared/validators/CustomValidator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  pageTitle: string;
  employee: IEmployee;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router,
    private employeeService: EmployeeService) { }
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
      emailDomain: 'Email should contain domain gmail.com.'
    },
    confirmemail: {
      required: 'Confirm Email is required.',
    },
    emailGroup: {
      emailMisMatch: 'Email and Confirm Email does not match.',
    },
    phone: {
      required: 'Phone is required.',
      whitespace: 'No White Space in Phone Number.'
    },
    // skillName: {
    //   required: 'Skill Name is required.',
    //   whitespace: 'No White Space in Skill Name.'
    // },
    // experience: {
    //   required: 'Experience is required.',
    //   whitespace: 'No White Space in Experience.'
    // },
    // proficiency: {
    //   required: 'Proficiency is required.'
    // },
  };

  ngOnInit() {
    // this.employeeForm = new FormGroup({ // 1.

    this.employeeForm = this.fb.group({   // 2.
      id: [''],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomeValidator.emailDomainCheck('gmail.com')]],
        confirmemail: ['', Validators.required],
      }, { validator: matchEmail }),

      phone: ['', CustomeValidator.noWhitespaceValidator],
      // Create skills form group
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    // Receive Param Id for Edit View.
    this.activatedRoute.paramMap.subscribe(param => {
      const empID = +param.get('id');
      if (empID) {
        this.pageTitle = 'Update';
        this.getEmployee(empID);
      } else {
        this.pageTitle = 'Create';
        this.employee = {
          id: null,
          fullName: '',
          email: '',
          contactPreference: '',
          phone: null,
          skills: []
        };
      }
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

  getEmployee(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe((employee: IEmployee) => {
      {
        this.editEmployee(employee);
        this.employee = employee;
      }
    }, (error) => console.log(error)
    );
  }

  editEmployee(employee: IEmployee) {
    // tslint:disable-next-line: no-unused-expression
    this.employeeForm.patchValue({
      id: employee.id,
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmemail: employee.email,
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.populateSkillFormArrayData(employee.skills));
  }

  populateSkillFormArrayData(skills: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skills.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experience: s.experience,
        proficiency: s.proficiency
      }));
    });

    return formArray;

  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  onRemoveSkillClick(skillIndex: number): void {
    const skillsArray = (this.employeeForm.get('skills') as FormArray);
    skillsArray.removeAt(skillIndex);
    skillsArray.markAsDirty();
    skillsArray.markAsTouched();
  }

  addSkillButtonClick(): void {
    // convert type to F.Array for Push method.
    (this.employeeForm.get('skills') as FormArray).push(this.addSkillFormGroup());
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


    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);

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
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
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
      // For Form Array
      // Form Array is collection of F.Controls,F.Group and nested F.Array.
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  // Submit -> Add/Update Form.
  submitForm() {
    this.mapFormDataToEmployeeModel();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.route.navigate(['employees']),
        (error) => console.log(error)
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.route.navigate(['employees']),
        (error) => console.log(error)
      );
    }
  }

  mapFormDataToEmployeeModel() {
    this.employee.id = this.employeeForm.value.id,
      this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
  }

  // Get Skills Form Array Controls
  getSkillFormArrayControls() {
    return (this.employeeForm.get('skills') as FormArray);
  }
}

function matchEmail(group: AbstractControl) {
  const email = group.get('email');
  const confirmemail = group.get('confirmemail');

  if (email.value === confirmemail.value || (confirmemail.pristine && confirmemail.value === '')) { return null; }
  else {
    return { 'emailMisMatch': true };
  }
}
