import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMarkComponent } from './single-mark.component';

describe('SingleMarkComponent', () => {
  let component: SingleMarkComponent;
  let fixture: ComponentFixture<SingleMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
