import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullanicidetayComponent } from './kullanicidetay.component';

describe('KullanicidetayComponent', () => {
  let component: KullanicidetayComponent;
  let fixture: ComponentFixture<KullanicidetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullanicidetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullanicidetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
