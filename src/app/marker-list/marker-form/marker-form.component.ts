import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarkersService} from '../../services/markers.service';
import {Router} from '@angular/router';
import {Marker} from '../../models/marker.model';

@Component({
  selector: 'app-marker-form',
  templateUrl: './marker-form.component.html',
  styleUrls: ['./marker-form.component.css']
})
export class MarkerFormComponent implements OnInit {

  markerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private markersService: MarkersService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.markerForm = this.formBuilder.group({
      title:['',Validators.required],
      address:['',Validators.required],
      latitude:['',Validators.required],
      longitude:['',Validators.required]
    });
  }

  onSaveMarker(){
    const title = this.markerForm.get('title').value;
    const address = this.markerForm.get('address').value;
    const latitude= this.markerForm.get('latitude').value;
    const longitude = this.markerForm.get('longitude').value;
    const newMarker = new Marker(latitude,longitude);
    newMarker.address = address;
    newMarker.title = title;
    this.markersService.createNewMarker(newMarker);
    this.router.navigate(['/map']);
  }
}
