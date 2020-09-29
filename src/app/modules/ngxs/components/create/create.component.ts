import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AddTutorial } from './../../../../shared/ngxs-store/actions/tutorial.actions';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Tutorial } from '../../models/tutorial';
import { TutorialState } from '../../../../shared/ngxs-store/states/tutorial.states' // We will use this shortly
import { validateEventsArray } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial[]>;

  constructor(private store: Store, private fb: FormBuilder) { }


  addTutorial() {
    const name = this.createForm.value.name;
    const url = this.createForm.value.url;

    this.store.dispatch(new AddTutorial({ name, url }));
    this.createForm.reset();
  }
  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    });
  }



}
