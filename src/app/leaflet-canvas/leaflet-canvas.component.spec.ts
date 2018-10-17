import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletCanvasComponent } from './leaflet-canvas.component';

describe('LeafletCanvasComponent', () => {
  let component: LeafletCanvasComponent;
  let fixture: ComponentFixture<LeafletCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
