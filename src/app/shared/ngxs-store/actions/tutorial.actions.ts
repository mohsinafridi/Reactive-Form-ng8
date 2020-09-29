import { Tutorial } from '../../../modules/ngxs/models/tutorial';


export class AddTutorial {
  static readonly type = '[TUTORIAL] add';

constructor(public payload: Tutorial) {}
}

export class RemoveTutorial {
static readonly type = '[TUTORIAL] remove';
constructor(public payload: string) {}
}
