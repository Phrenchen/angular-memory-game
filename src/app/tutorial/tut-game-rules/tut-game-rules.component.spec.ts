import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutGameRulesComponent } from './tut-game-rules.component';

describe('TutGameRulesComponent', () => {
  let component: TutGameRulesComponent;
  let fixture: ComponentFixture<TutGameRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutGameRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutGameRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
