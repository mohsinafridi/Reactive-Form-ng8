import { RemoveTutorial } from '../../../../shared/ngxs-store/actions/tutorial.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial';
import { Store } from '@ngxs/store';
import { TutorialState } from '../../../../shared/ngxs-store/states/tutorial.states' // We will use this shortly

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
tutorials: Observable<Tutorial>

  // tutorials$: Observable<Tutorial>
 // @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial>


  constructor(private store: Store) {
    debugger
    this.tutorials = this.store.select(state => state.tutorials.tutorials);
  }

  delTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name));
  }
  ngOnInit() {
  }

}
