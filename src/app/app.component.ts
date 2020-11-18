import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyAwJXUPO6Wb-VnQnvlisLhh7jTOVtT-W4I',
      authDomain: 'library-8f85a.firebaseapp.com',
      databaseURL: 'https://library-8f85a.firebaseio.com',
      projectId: 'library-8f85a',
      storageBucket: 'library-8f85a.appspot.com',
      messagingSenderId: '95649040823',
      appId: '1:95649040823:web:fbec15ace68df716ac4032',
      measurementId: 'G-NY3FP5LCFN'
    };
    firebase.initializeApp(config);
    firebase.analytics();
  }
}
