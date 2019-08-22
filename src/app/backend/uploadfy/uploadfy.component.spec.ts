import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfyComponent } from './uploadfy.component';

describe('UploadfyComponent', () => {
  let component: UploadfyComponent;
  let fixture: ComponentFixture<UploadfyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadfyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
