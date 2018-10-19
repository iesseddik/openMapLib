import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlCanvasComponent } from './ol-canvas.component';

describe('OlCanvasComponent', () => {
  let component: OlCanvasComponent;
  let fixture: ComponentFixture<OlCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
