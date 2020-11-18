import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Marker} from '../models/marker.model';
import {Subscription} from 'rxjs';
import {MarkersService} from '../services/markers.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {CommonModule} from '@angular/common';
import {MapService} from '../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Component({
  selector: 'app-marker-list',
  templateUrl: './marker-list.component.html',
  styleUrls: ['./marker-list.component.css']
})


export class MarkerListComponent implements OnInit, OnDestroy {

  markers: Marker[];
  markersSubscription: Subscription;

  constructor(private markersService: MarkersService, private router: Router, private authService: AuthService, private mapService: MapService) { }

  ngOnInit(): void {
    this.markersSubscription = this.markersService.markersSubject.subscribe(
      (markers: Marker[]) => {
        this.markers = markers;
      }
    );
    this.markersService.emitMarkers();
    for (let marker of this.markers){
      this.addMarker(marker);
    }
  }

  onNewMarker(){
    this.router.navigate(['/markers','new']);
  }

  onDeleteMarker(marker: Marker){
    this.markersService.removeMarkers(marker);
  }

  onViewMarker(id:number){
    this.router.navigate(['/markers','view',id]);
  }

  ngOnDestroy(): void {
    this.markersSubscription.unsubscribe();
  }

  addMarker(marker: Marker): void {
    const newMarker = new mapboxgl.Marker()
      .setLngLat([marker.longitude,marker.latitude])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>"+marker.title+"</h3><br><p>"+marker.address+"</p>"))
      .addTo(this.mapService.map);
  }
}
