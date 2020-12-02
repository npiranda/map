import { Injectable } from '@angular/core';
import {Marker} from '../models/marker.model';
import {Subject} from 'rxjs';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class MarkersService {

  constructor() {
    this.getMarkers();
  }

  markers: Marker[] = [];
  markersSubject = new Subject<Marker[]>();
  emitMarkers(){
    this.markersSubject.next(this.markers);
  }

  saveMarkers(){
    firebase.database().ref('/markers').set(this.markers);
  }

  getMarkers() {
    firebase.database().ref('/markers')
      .on('value',(data:DataSnapshot) =>{
        this.markers = data.val() ? data.val() : [];
        this.emitMarkers();
      });
  }
  getSingleMarker(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/markers/'+id).once('value').then(
          (data:DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewMarker(newMarker: Marker){
    this.markers.push(newMarker);
    this.saveMarkers();
    this.emitMarkers();
  }

  removeMarkers(marker: Marker){
    const markerIndexToRemove = this.markers.findIndex(
      (markerEl) => {
        if(markerEl === marker){
          return true;
        }
      }
    );
    this.markers.splice(markerIndexToRemove,1);
    this.saveMarkers();
    this.emitMarkers();
  }
}
