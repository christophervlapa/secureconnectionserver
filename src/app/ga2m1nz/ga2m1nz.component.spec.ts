import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ga2m1nzComponent } from './ga2m1nz.component';

describe('Ga2m1nzComponent', () => {
  let component: Ga2m1nzComponent;
  let fixture: ComponentFixture<Ga2m1nzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ga2m1nzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ga2m1nzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
