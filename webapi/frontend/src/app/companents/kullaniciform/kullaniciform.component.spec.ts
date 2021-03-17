import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciformComponent } from './kullaniciform.component';

describe('KullaniciformComponent', () => {
  let component: KullaniciformComponent;
  let fixture: ComponentFixture<KullaniciformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullaniciformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullaniciformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
