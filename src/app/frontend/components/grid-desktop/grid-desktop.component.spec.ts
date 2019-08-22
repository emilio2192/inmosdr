import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDesktopComponent } from './grid-desktop.component';

describe('GridDesktopComponent', () => {
  let component: GridDesktopComponent;
  let fixture: ComponentFixture<GridDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
