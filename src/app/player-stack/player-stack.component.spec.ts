import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStackComponent } from './player-stack.component';

describe('PlayerStackComponent', () => {
  let component: PlayerStackComponent;
  let fixture: ComponentFixture<PlayerStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
