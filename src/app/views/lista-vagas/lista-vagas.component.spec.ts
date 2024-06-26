import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVagasComponent } from './lista-vagas.component';

describe('ListaVagasComponent', () => {
  let component: ListaVagasComponent;
  let fixture: ComponentFixture<ListaVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVagasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
