import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoVagaComponent } from './candidato-vaga.component';

describe('CandidatoVagaComponent', () => {
  let component: CandidatoVagaComponent;
  let fixture: ComponentFixture<CandidatoVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoVagaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatoVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
