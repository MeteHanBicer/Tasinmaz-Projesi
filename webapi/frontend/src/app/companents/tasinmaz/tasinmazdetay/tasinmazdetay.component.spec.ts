import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasinmazdetayComponent } from './tasinmazdetay.component';

describe('TasinmazdetayComponent', () => {
  let component: TasinmazdetayComponent;
  let fixture: ComponentFixture<TasinmazdetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasinmazdetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasinmazdetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
