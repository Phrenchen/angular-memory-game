import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutEmptyComponent } from './tut-empty.component';

describe('TutEmptyComponent', () => {
  let component: TutEmptyComponent;
  let fixture: ComponentFixture<TutEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
