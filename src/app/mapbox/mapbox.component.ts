import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import {MapService} from '../services/map.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {
  map: mapboxgl.Map;
  name: string;

  constructor(private mapService: MapService, private authService: AuthService) { }

  ngOnInit(): void {
    this.mapService.initMap();
    this.name = this.authService.user;
  }

}
