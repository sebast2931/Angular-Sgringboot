import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesformComponent } from './clientesform.component';

describe('ClientesformComponent', () => {
  let component: ClientesformComponent;
  let fixture: ComponentFixture<ClientesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
