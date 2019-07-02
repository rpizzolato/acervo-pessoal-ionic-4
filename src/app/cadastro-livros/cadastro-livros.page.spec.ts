import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLivrosPage } from './cadastro-livros.page';

describe('CadastroLivrosPage', () => {
  let component: CadastroLivrosPage;
  let fixture: ComponentFixture<CadastroLivrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroLivrosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLivrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
