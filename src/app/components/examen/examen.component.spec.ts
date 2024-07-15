import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenComponent } from './examen.component';

describe('ExamenComponent', () => {
  let component: ExamenComponent;
  let fixture: ComponentFixture<ExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
