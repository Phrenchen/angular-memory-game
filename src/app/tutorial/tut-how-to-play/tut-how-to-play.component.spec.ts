import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutHowToPlayComponent } from './tut-how-to-play.component';

describe('TutHowToPlayComponent', () => {
  let component: TutHowToPlayComponent;
  let fixture: ComponentFixture<TutHowToPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutHowToPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutHowToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
