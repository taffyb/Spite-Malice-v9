import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebAnimationComponent } from './web-animation.component';

describe('WebAnimationComponent', () => {
  let component: WebAnimationComponent;
  let fixture: ComponentFixture<WebAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
