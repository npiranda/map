import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';



@Injectable({
  providedIn: 'root'
})

@Injectable()
export class MapService {
  map: mapboxgl.Map;
  style = 'mapbox://styles/npiranda/cki08zvqh3iwf19r9s0w7qzo8';
  lat = 37.75;
  lng = -122.41;


  initMap(){
    // @ts-ignore
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
    // @ts-ignore
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center:[this.lng,this.lat]
    });
  }

}
