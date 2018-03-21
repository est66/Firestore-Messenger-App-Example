import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../../models/user.model';


@Injectable()
export class AuthProvider {
  user: User;
  constructor() {
  }


}
