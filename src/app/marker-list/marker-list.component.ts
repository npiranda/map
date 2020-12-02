import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Marker} from '../models/marker.model';
import {Subject, Subscription} from 'rxjs';
import {MarkersService} from '../services/markers.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MapService} from '../services/map.service';
import * as mapboxgl from 'mapbox-gl';


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

  flyTo(marker: Marker) {
    this.mapService.map.flyTo({
      center: [
        marker.longitude,marker.latitude
      ],
      zoom: 13
    })
  }
}
